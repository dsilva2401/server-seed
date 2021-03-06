import {Routes} from '@angular/router';
import {Component} from '@angular/core';
import {LoginComponent} from './components/login-form';
// import {About} from './about/about';
// import {Home} from './home/home';
// import {RepoBrowser} from './github/repo-browser/repo-browser';
// import {RepoList} from './github/repo-list/repo-list';
// import {RepoDetail} from './github/repo-detail/repo-detail';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'login-form', terminal: true},
  {path: 'login-form', component: LoginComponent},
  // {path: 'about', component: About},
  // {path: 'github', component: RepoBrowser,
  //   children: [
  //     {path: '', component: RepoList},
  //     {path: ':org', component: RepoList,
  //       children: [
  //         {path: '', component: RepoDetail},
  //         {path: ':repo', component: RepoDetail}
  //       ]
  //     }]
  // }
];

