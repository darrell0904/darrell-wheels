import '../../../../styles/pagination/index.less';
import {
  noop,
  $$,
  addClass,
  removeClass,
  hasClass,
  addEvent,
  removeHandler,
} from '../../../../helpers/utils';

class Select {
  private options: any;
  private selectElement: any;
  private selectOptions: any;
  private SelectValueElement: any;
  private SelectDropdownElement: any;
  private pageSize: any;


  constructor(selector: any, options = {}) {
    // 默认配置
    this.options = {
      pageSizeOptions: ['10', '20', '30', '40'],
      onShowSizeChange: noop,
      disabled: false,
      isSmall: false,
      currentPage: 1,
      value: 10,
    }

    Object.assign(this.options, options);
    this.init(selector);
  }

  /**
   * 重新注册事件
   * @param element
   * @param type
   * @param handler
   */
  private refreshEvent (element: any, type: any, handler: any) {
    removeHandler(element, type, handler);
    addEvent(element, type, handler)
  }

  private bodyHideDropdown () {
    const SelectValueElement = this.SelectValueElement;
    const SelectDropdownElement = this.SelectDropdownElement;

    if (!hasClass(SelectDropdownElement, 'none')) {
      addClass(SelectDropdownElement, 'none');
      removeClass(SelectValueElement, 'darrell-open-select-dropdown');
    }
  }

  /**
   * 改变页数
   */
  private changeSelect () {
    const SelectValueElement = this.SelectValueElement;
    const SelectDropdownElement = this.SelectDropdownElement;

    const isDisabled = this.options.disabled;

    if (!isDisabled) {
      addEvent(SelectValueElement, 'click', this.ValueClickHandler.bind(this));
      addEvent(SelectDropdownElement, 'click', this.DropdownClickHandler.bind(this));
      addEvent($$('body')[0], 'click', this.bodyHideDropdown.bind(this))
    }
  }

  private ValueClickHandler (ev: any) {
    let e = ev || window.event;
    e.stopPropagation();
    const target = e.target || e.srcElement;
    const SelectDropdownElement = this.SelectDropdownElement;
    const parentNode = target.parentNode;

    if (hasClass(SelectDropdownElement, 'none')) {
      removeClass(SelectDropdownElement, 'none');
      addClass(parentNode, 'darrell-open-select-dropdown');
    } else {
      addClass(SelectDropdownElement, 'none');
      removeClass(parentNode, 'darrell-open-select-dropdown');
    }
  }

  private DropdownClickHandler (ev: any) {
    let e = ev || window.event;
    e.stopPropagation();
    const target = e.target || e.srcElement;

    const currentPage = this.options.currentPage;

    const value = target.getAttribute('value');

    this.changeSize(parseInt(value, 10));

    this.options.onShowSizeChange && this.options.onShowSizeChange(currentPage, parseInt(value, 10));

    this.renderSelect();
  }

  private changeSize (pageSize: number) {
    this.pageSize = pageSize;
  }

  /**
   * 渲染select
   */
  private renderSelect () {
    this.selectElement.innerHTML = "";
    // const isDisabled = this.options.disabled;
    // const isSmall = this.options.size;

    let DivEle = document.createElement("div");

    const valueTpl = this.renderValueWrapper();
    const dropDownTpl = this.renderDropdown();

    DivEle.append(valueTpl);
    DivEle.append(dropDownTpl);

    this.selectElement.appendChild(DivEle);
  }

  /**
   * 渲染 ValueWrapper
   */
  renderValueWrapper (): any {
    let fragment = document.createDocumentFragment();
    const value = this.pageSize;

    let DivWrapEle = document.createElement("div");
    let DivSecWrapEle = document.createElement("div");

    let DivValueEle = document.createElement("div");
    let SpanIconWrapEle = document.createElement("span");
    let IconWrapEle = document.createElement("i");

    DivWrapEle.setAttribute('class', 'darrell-select');
    DivSecWrapEle.setAttribute('class', 'darrell-select-selection');
    DivValueEle.setAttribute('class', 'darrell-select-selection-selected-value');
    DivValueEle.setAttribute('id', 'darrell-select-selection-value');
    DivValueEle.innerHTML = `${value} 页/条`;

    SpanIconWrapEle.setAttribute('class', 'darrell-select-arrow');
    IconWrapEle.setAttribute('class', 'iconfont icon-down');

    SpanIconWrapEle.appendChild(IconWrapEle);

    DivSecWrapEle.append(DivValueEle);
    DivSecWrapEle.append(SpanIconWrapEle);

    if (!this.SelectValueElement) {
      this.SelectValueElement = DivSecWrapEle;
    } else {
      removeHandler(this.SelectValueElement, 'click', this.ValueClickHandler.bind(this));
      this.SelectValueElement = DivSecWrapEle;
      addEvent(this.SelectValueElement, 'click', this.ValueClickHandler.bind(this));
    }

    DivWrapEle.append(DivSecWrapEle);

    return fragment.appendChild(DivWrapEle);
  }

  /**
   * 渲染 Dropdown
   */
  private renderDropdown (): any  {
    let fragment = document.createDocumentFragment();
    const pageSizeOptions = this.options.pageSizeOptions;
    const value = this.pageSize;

    let DivWrapEle = document.createElement("div");
    let DivSecWrapEle = document.createElement("div");
    let UlWrapEle = document.createElement("ul");

    DivWrapEle.setAttribute('class', 'darrell-select-dropdown-wrap');
    DivSecWrapEle.setAttribute('class', 'darrell-select-dropdown none');
    UlWrapEle.setAttribute('class', 'darrell-select-dropdown-menu');

    pageSizeOptions.forEach((val:any) => {
      let liEle = document.createElement("li");
      liEle.setAttribute("class", "darrell-select-dropdown-menu-item");
      liEle.setAttribute("id", "darrell-select-dropdown-menu-item");
      liEle.setAttribute("value", val);

      if (value === val) {
        addClass(liEle, 'darrell-select-dropdown-menu-item-selected');
      }

      liEle.innerHTML = `${val} 页/条`;

      UlWrapEle.append(liEle);
    })

    DivSecWrapEle.append(UlWrapEle);

    if (!this.SelectDropdownElement) {
      this.SelectDropdownElement = DivSecWrapEle;
    } else {
      removeHandler(this.SelectDropdownElement, 'click', this.DropdownClickHandler.bind(this));
      this.SelectDropdownElement = DivSecWrapEle;
      addEvent(this.SelectDropdownElement, 'click', this.DropdownClickHandler.bind(this));
    }

    DivWrapEle.append(DivSecWrapEle);

    return fragment.appendChild(DivWrapEle);
  }

  /**
   * 初始化相应的 select
   * @param selector
   */
  private init (selector:any) {

  	// select元素
    this.selectElement = $$(selector)[0];

    // 数据总数
    this.selectOptions = this.options.pageSizeOptions;

    this.pageSize = this.options.value;

    // 渲染
    this.renderSelect();

    // 改变页数并触发事件
    this.changeSelect();
  }
}

export default Select;