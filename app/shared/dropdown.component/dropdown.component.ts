import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'dropdown-comp',
    moduleId: module.id,
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']

})
export class DropdownComponent<T extends IDropdownBase>  {

    @Input() items: T[];
    @Input() excludeItem: T;
    @Output() selectedItemClicked: EventEmitter<T> =
    new EventEmitter<T>();

    onSelect(teamId: number) {
        this.selectedItemClicked.emit(this.items.filter((a) => { return a.id == teamId })[0]);
    }
}