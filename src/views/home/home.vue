<template>
   <div contentEditable="true" style="border:1px solid #ccc;width:100%;height: 100%;outline: none">
      this is div
      <span contentEditable="false" style="border:1px solid #ccc;">this is span</span>
      dsadasdasdsadasad
      <span contentEditable="false" style="border:1px solid #ccc;">88888888</span>
      &nbsp;
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "hide-show",
  props: {
    // 当前组件dataInfo
    dataInfo: {
      type: Object,
      default: () => {

      }
    },

    // 画布里面已经拖拽的并且key存在的组件
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeNames: ["1"],
      collapseData: [
        {
          title: "当前表单",
          type: 1,
          list: [
            {
              key: '1',
              name: '测试01'
            }
          ]
        }
      ],
      paramsKey: {}
    };
  },
  methods: {
    // 格式化数据方法
    handleFormatData() {
      const list = [];
      const params = {};
      this.data.forEach(item => {
        // 区分 栅格 标签页 子表 这几类布局组件
        if (item.type === "grid") {
          // 栅格
          item.columns.forEach(val => {
            val.list.forEach(v => {
              if (v.model && v.model != "") {
                this.$set(this.paramsKey, v.model, v.value);
                list.push({
                  name: v.name,
                  type: 1,
                  key: v.model
                });
              }
            });
          });
        } else if (item.type === "tabs") {
          // 标签页
          item.tab.forEach(val => {
            val.columns.forEach(v => {
              if (v.type === "grid") {
                v.columns.forEach(col => {
                  col.list.forEach(l => {
                    if (l.model && l.model != "") {
                      this.$set(this.paramsKey, l.model, l.value);
                      list.push({
                        name: l.name,
                        type: 1,
                        key: l.model
                      });
                    }
                  });
                });
              } else {
                if (v.model && v.model != "") {
                  this.$set(this.paramsKey, v.model, v.value);
                  list.push({
                    name: v.name,
                    type: 1,
                    key: v.model
                  });
                }
              }
            });
          });
        } else if (item.type === "childrenTable") {
          // 子表
          // 子表不能作为控制显示隐藏的条件
          console.log("item: ", item);
        } else {
          // 普通组件
          if (item.model && item.model != "") {
            this.$set(this.paramsKey, item.model, item.value);
            list.push({
              name: item.name,
              type: 1,
              key: item.model
            });
          }
        }
      });
      // this.collapseData[0]["list"] = list.filter(
      //   val => val.key != this.dataInfo.model
      // );
    },

    handleChange(val) {},

    // 清空
    handleClearExpression() {
      $(".flex").empty();
    },

    // 获取最终表达式
    handleGetExpression() {
      let m = ''
      let str = $('.flex').prop("outerHTML")
      // 谷歌浏览器如果开启翻译功能会导致生成font标签包裹文本
      str = str.replace(/<font style="vertical-align: inherit;">/g, '')
      str = str.replace(/<\/font>/g, '')
      str = str.replace(/<div contenteditable="true" type="parent" class="flex">/g, '')
      str = str.replace(/<\/div>/g, '')
      $('.flex').empty()
      $('.flex').html(str)
      Array.from($('.flex').contents()).forEach(val => {
        if ($(val).attr('data-key')) {
          m = m + $(val).attr('data-key')
        } else {
          m = m + $(val).text()
        }
      })

      try {
        eval(m);
        if (
          this.dataInfo.options &&
          typeof this.dataInfo.options !== "string"
        ) {
          this.dataInfo.options.js_content = m;
          this.dataInfo.options.htmlStr = $(".flex").prop("outerHTML");
        } else {
          this.dataInfo.options = {};
          this.dataInfo.options.js_content = m;
          this.dataInfo.options.htmlStr = $(".flex").prop("outerHTML");
        }
        this.$emit("colse-dailog");
        return str;
      } catch (err) {
        console.log(err);
        this.$message.error("配置的表达式不合法，请检查！");
      }
    }
  },
  mounted() {
    const _this = this;
    $(".hide-show-right-box").html('');
    $(".flex").keydown(function(e) {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    });
    this.handleFormatData();
    sel = window.getSelection();
    var sel, range;
    var textContent;

    $('.flex').focus()
    $('.flex').blur(function() {
      getblur()
    })

    function getblur() {
      range = sel.getRangeAt(0);
    }

    // 光标所在位置追加元素
    function insertHtmlAtCaret(html) {
      if (window.getSelection) {
        // IE9 and non-IE
        if (sel.getRangeAt && sel.rangeCount) {
          var el = document.createElement("div");
          el.innerHTML = html;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag); // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }
      textContent = $(".flex").html();
    }

    this.$nextTick(() => {
      $('.collapse-item').click(function() {
        const { name, key } = JSON.parse($(this).attr('data'))
        let htmlStr = "";
        const tempKey = "this.paramsKey." + key;
        // hspace=15
        htmlStr = `<img data-key="${ tempKey }" style="background: #3296fa;" src="" hspace=15>`;
        insertHtmlAtCaret(htmlStr)
      })
    })
  }
};
</script>

<style lang="scss" scoped>
.hide-show {
  margin: 0 auto;
  width: 700px;
  height: 450px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  .hide-show-left {
    border-right: 1px solid #e6e6e6;
    width: 220px;
    height: 100%;
    background: #e6e6e6;
    padding: 10px;
    border-radius: 8px 0 0 8px;
    overflow: auto;
    box-sizing: border-box;
    .collapse-item {
      text-align: center;
      height: 32px;
      line-height: 32px;
      border-bottom: 1px solid #e6e6e6;
      cursor: pointer;
      margin: 0;
      padding: 0;
    }

    .collapse-item:hover {
      background: #eee;
      height: 32px;
      line-height: 32px;
    }

    .el-collapse-item__header {
      background: #3296fa;
      color: #fff;
      padding-left: 15px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }

  .hide-show-right {
    flex: 1;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    .hide-show-right-box {
      height: 250px;
      overflow: auto;
      padding: 10px;
      .flex {
        color: #666;
        padding: 20px;
        outline: none;
        line-height: 28px;
        height: 28px;
        font-size: 20px;        
      }
      .flex,  
      .flex * {  
          -webkit-user-select: auto;  
          -webkit-user-modify: read-write;  
      }
      width: 100%;
      padding: 10px;
    }
    .hide-show-right-bottom {
      * {
        margin: 0;
        padding: 0;
      }
      height: 200px;
      .title {
        background: #eed5d2;
        height: 32px;
        line-height: 32px;
        padding-left: 20px;
        margin-bottom: 15px;
        color: #fff;
      }
      ul {
        padding-left: 20px;
        li {
          line-height: 22px;
        }
      }
    }
  }
}
</style>