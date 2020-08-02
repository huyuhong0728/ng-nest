import { Component } from '@angular/core';
import { XTimelineNode } from '@ng-nest/ui/timeline';
import { XAddDays, XAddHours } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-color',
  templateUrl: './color.component.html'
})
export class ExColorComponent {
  now = new Date();
  data: XTimelineNode[] = [
    {
      label: 'Add leave',
      content: 'Li San leave time 2020-2-23 to 2020-3-1',
      icon: 'fto-user',
      color: 'black',
      time: XAddDays(this.now, -3)
    },
    {
      label: 'Supervisor approval',
      content: 'Wang Si approved',
      icon: 'fto-user',
      color: 'red',
      time: XAddDays(this.now, -2)
    },
    {
      label: 'Applicant cancellation',
      content: 'Li San',
      icon: 'fto-user',
      color: 'blue',
      time: XAddDays(this.now, -1)
    },
    {
      label: 'Personnel review',
      content: 'Wang Qing passed the review',
      icon: 'fto-user',
      color: 'rgba(51, 51, 51, 0.72)',
      time: XAddHours(this.now, -12)
    },
    {
      label: 'End',
      content: '',
      icon: 'fto-user',
      color: '#ffff00',
      time: XAddHours(this.now, -6)
    }
  ];
}