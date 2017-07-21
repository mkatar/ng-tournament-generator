import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'


import { TournamentListComponent } from './components/tournament-list.component/tournament-list.component'
import { TournamentViewComponent } from './components/tournament-view.component/tournament-view.component'
import { TeamAddComponent } from './components/team-add.component/team-add.component'
import { GameResultComponent } from './components/game-result.component/game-result.component'
import { ReactiveFormsModule } from "@angular/forms";
import { MatchHistoryComponent } from "./components/match-history.component/match-history.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'tournament', component: TournamentViewComponent }]),
        ReactiveFormsModule],
    declarations: [
        TournamentListComponent,
        TournamentViewComponent,
        TeamAddComponent,
        GameResultComponent,
        MatchHistoryComponent]
})
export class TournamentModule { }