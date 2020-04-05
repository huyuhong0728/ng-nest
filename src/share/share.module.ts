import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { DevelopingComponent } from './developing/developing.component';
import { XDocModule } from '@ng-nest/ui/doc';
import { XExamplesModule } from '@ng-nest/ui/examples';
import { XApiModule } from '@ng-nest/ui/api';
import { XIconModule } from '@ng-nest/ui/icon';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XPatternModule } from '@ng-nest/ui/pattern';

const components = [DevelopingComponent];

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  LayoutModule,
  XDocModule,
  XExamplesModule,
  XApiModule,
  XIconModule,
  XTabsModule,
  XFenceModule,
  XHighlightModule,
  XPatternModule
];

const providers = [];

@NgModule({
  imports: [...modules],
  declarations: [...components],
  exports: [...components, ...modules],
  providers: [...providers]
})
export class ShareModule {}
