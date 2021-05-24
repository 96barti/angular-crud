import {Component, EventEmitter, Input, Output} from '@angular/core';
import Tutorial from "../../models/tutorial";
import {TutorialService} from "../../services/tutorial.service";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent {


  @Input() tutorial!: Tutorial ;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  message = '';
  constructor(private tutorialService: TutorialService) {
  }


  ngOnChanges(): void{
    this.message = '';
  }

  updatePublished(status: boolean): void{
    this.tutorialService.update(this.tutorial.key, {published: status})
      .then(() => {
        this.tutorial.published = status;
        this.message = "The status was updated successfully!";
      })
      .catch(err => console.log(err));
  }
  updateTutorial(): void{
    const data ={
      title: this.tutorial.title,
      description: this.tutorial.description
    };

    this.tutorialService.update(this.tutorial.key, data)
      .then(() => this.message = 'The tutorial was updated successfully!')
      .catch(err => console.log(err));
  }

  deleteTutorial(): void{
    this.tutorialService.delete(this.tutorial.key)
      .then(() => {
        this.refreshList.emit();
        this.message = "The tutorial was deleted";
      })
      .catch(err => console.log(err));
  }
}
