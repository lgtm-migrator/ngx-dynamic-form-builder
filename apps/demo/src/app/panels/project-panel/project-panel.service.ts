import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../../shared/models/project';

@Injectable()
export class ProjectPanelService {
  project$ = new BehaviorSubject(
    plainToClass(Project, environment.defaults.project)
  );
  clear() {
    this.project$.next(
      plainToClass(Project, environment.defaults.project)
    );
  }
  store(project: Project) {
    this.project$.next(project);
  }
}
