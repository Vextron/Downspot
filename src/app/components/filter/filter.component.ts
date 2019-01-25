import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private timer = null;

  value = '';

  @Input() list: any;
  @Input() cpy_list: any;
  
  @Output() filtered_list = new EventEmitter<Array<any>>();

  constructor() { }

  ngOnInit() {

  }

  filter() {

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.value !== '') {

        this.cpy_list = this.list.filter( artist => artist.name.toLowerCase().startsWith(this.value.toLocaleLowerCase()));

        this.filtered_list.emit(this.cpy_list);

      } else {

        this.cpy_list = this.list;

        this.filtered_list.emit(this.cpy_list);
      }

    }, 300);
  }

  clear() {

    this.value = '';
    this.cpy_list = this.list;

    this.filtered_list.emit(this.cpy_list);
  }


}
