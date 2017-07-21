import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'excludeObjectfilter',
    pure: false
})
export class ExcludeObjectFilterPipe<T extends IDropdownBase> implements PipeTransform {
    transform(items: T[], excludeObject: T): T[] {
        if (this.isFilteringNotNeeded(items, excludeObject)) {
            return items;
        }

        return items.filter(item => item.id !== excludeObject.id);
    }

    isFilteringNotNeeded(items: T[], excludeObject: T): boolean {
        return !items || !excludeObject;
    }
}