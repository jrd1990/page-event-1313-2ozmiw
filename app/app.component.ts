import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const dataUrl =
      'https://raw.githubusercontent.com/l-lin/angular-datatables/master/demo/src/data/data.json';
    this.dtOptions = {
      ajax: dataUrl,
      columns: [
        {
          title: 'ID',
          data: 'id',
        },
        {
          title: 'First name',
          data: 'firstName',
        },
        {
          title: 'Last name',
          data: 'lastName',
        },
        {
          title: '',
          data: null,
          orderable: true,
          render: (data, type, full) =>
            `<button class="buttonClass">Edit</button>`,
        },
      ],
      drawCallback: () => {
        this.elementRef.nativeElement
          .querySelector('.paginate_button.next')
          .addEventListener('click', this.onClick.bind(this));
        $('.buttonClass').on('click', () => {
          //click event on button with class `buttonClass`
          this.alert2();
        });
      },
    };
  }

  ngOnDestroy(): void {
    // Don't forget to remove the listener!
    this.elementRef.nativeElement
      .querySelector('.paginate_button.next')
      .removeEventListener('click');
  }

  onClick(): void {
    alert('next');
  }

  alert2(): void {
    alert('alerta');
  }
}
