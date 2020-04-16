import { XData, XTemplate, XIdentityProperty, XControlValueAccessor, XDataConvert, XInputBoolean, XSize } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Checkbox
 * @selector x-checkbox
 * @decorator component
 */
export const XCheckboxPrefix = 'x-checkbox';

/**
 * Checkbox Property
 */
@Component({ template: '' })
export class XCheckboxProperty extends XControlValueAccessor<any[]> {
  /**
   * 单选框数据
   */
  @Input() @XDataConvert() data: XData<XCheckboxNode> = [];
  /**
   * 按钮样式
   */
  @Input() @XInputBoolean() button: boolean;
  /**
   * 图标样式
   */
  @Input() @XInputBoolean() icon: boolean;
  /**
   * 不确定状态的样式
   */
  @Input() @XInputBoolean() indeterminate: boolean;
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';
}

/**
 * Checkbox 数据对象
 */
export interface XCheckboxNode extends XIdentityProperty {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 图标的提示信息
   */
  title?: string;
  /**
   * 标签文字
   */
  label?: XTemplate;
}
