import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XTreeFilePrefix, XTreeFileProperty, XTreeFileNode, XTreeFileImgs } from './tree-file.property';
import { HttpClient } from '@angular/common/http';
import { XIsEmpty, XConfigService } from '@ng-nest/ui/core';
import { XCrumbNode } from '@ng-nest/ui/crumb';
import { delay } from 'rxjs/operators';

@Component({
  selector: `${XTreeFilePrefix}`,
  templateUrl: './tree-file.component.html',
  styleUrls: ['./tree-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeFileComponent extends XTreeFileProperty {
  activatedNode: XTreeFileNode;
  loading: boolean = false;
  time: number;
  timeout: number = 200;

  get catalogHeight() {
    return Number(this.maxHeight);
  }

  get codeHeight() {
    return Number(this.maxHeight) - (Boolean(this.showCrumb) ? 1.5 : 0);
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public http: HttpClient,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    if (!this.showTree && this.activatedId) {
      this.catalogChange((this.data as XTreeFileNode[]).find((x) => x.id == this.activatedId) as XTreeFileNode);
    }
  }

  catalogChange(node: XTreeFileNode) {
    if (node?.leaf) return;
    if (node.url && !node.contentLoaded) {
      this.time = new Date().getTime();
      this.loading = true;
      this.cdr.detectChanges();
      this.activatedNode = node;
      node.fileType = XTreeFileImgs.indexOf((node.type as string).toLowerCase()) !== -1 ? 'img' : 'code';
      node.crumbData = this.setCurmbData(node);
      node.url = node.url?.indexOf(this.domain) === 0 ? node.url : `${this.domain}/${node.url}`;
      switch (node.fileType) {
        case 'code':
          this.http
            .get(node.url, { responseType: 'text' })
            .pipe(delay(new Date().getTime() - this.time > this.timeout ? 0 : this.timeout - new Date().getTime() + this.time))
            .subscribe((x) => {
              node.content = x;
              node.contentLoaded = true;
              this.loading = false;
              this.cdr.detectChanges();
            });
          break;
        case 'img':
          this.cdr.detectChanges();
          break;
      }
    } else {
      this.activatedNode = node;
      this.cdr.detectChanges();
    }
  }

  imgOnload() {
    this.loading = false;
    this.cdr.detectChanges();
  }

  setCurmbData(node: XTreeFileNode) {
    let crumbData: XCrumbNode[] = [{ id: node.id, label: node.label }];
    const getParent = (child: XTreeFileNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = (this.data as XTreeFileNode[]).find((x) => x.id === child.pid) as XTreeFileNode;
      if (!XIsEmpty(parent)) {
        crumbData = [{ id: parent.id, label: parent.label }, ...crumbData];
        getParent(parent);
      }
    };
    getParent(node);

    return crumbData;
  }

  menuToggle() {
    this.toggle = !this.toggle;
    this.cdr.detectChanges();
  }
}
