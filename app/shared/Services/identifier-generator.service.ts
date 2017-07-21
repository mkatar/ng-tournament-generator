import { Injectable } from '@angular/core';


@Injectable()
export class IdentifierGeneratorService {
    id: number;

    constructor() {
        this.id = 0;
    }

    getNextId(): number {
        this.id++;
        return this.id;
    }
}