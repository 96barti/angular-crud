import {Component, OnInit} from '@angular/core';
import {TutorialService} from "../../services/tutorial.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  currentTutorial: any;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) {
  }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList() {
    this.currentTutorial = null;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }


  retrieveTutorials() {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
    });
  }

  setActivateTutorial(tutorial: null, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err))
  }
}
