import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Poste, PosteLight, CreatePoste, VoteType } from '../poste/poste.class';
import { environment } from './../../environments/environment';
import { PosteSource } from './poste.source';

@Injectable()
export class PosteServiceInMemory implements PosteSource {

  private href: string = environment.data_href;
  private postes: Poste[] = [];
  private offlineUserOfflinePostes: string[] = ['idididi'];
  private userVotes = {};

  constructor() {
    this.postes.push({
      id: 'idididi',
      title: 'Coudre avec une pompe à vélo (facile)',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus auctor sem quis varius. Ut tortor mauris, cursus quis rutrum nec, maximus in quam. Aenean porttitor auctor sapien sed molestie. Nam faucibus, felis ac mollis iaculis, tellus ipsum iaculis massa, vitae tempus tortor lectus non ipsum. Duis sit amet magna consequat, feugiat libero eget, ultricies risus. Suspendisse maximus purus ut nulla pellentesque mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In tincidunt dui mollis massa rhoncus eleifend. Vestibulum auctor libero vitae auctor congue. Nullam eu gravida sem, a pulvinar nisl. Nulla vel nunc accumsan massa tincidunt vulputate vel et justo. Sed non est congue, accumsan enim sit amet, cursus purus. Curabitur ligula metus, fringilla nec felis vitae, consequat imperdiet quam. Vivamus aliquam vel felis sed fringilla. Nullam egestas suscipit ex et blandit.
        Donec venenatis arcu vel sodales viverra. Maecenas rhoncus hendrerit enim vel aliquet. Nullam mauris sem, iaculis quis nibh in, molestie pharetra orci. Donec vitae ante vitae nibh venenatis pretium. Integer venenatis est mauris, facilisis ornare odio feugiat sed. Fusce dictum tellus a purus pulvinar, nec imperdiet nisi pretium. Aliquam erat volutpat. Suspendisse varius felis ipsum, ac pulvinar nunc porttitor maximus. Praesent egestas enim metus, sed tempor eros convallis id. Suspendisse potenti. Quisque commodo enim sit amet nunc aliquet ultrices. Fusce ullamcorper sollicitudin metus, non bibendum dolor efficitur in. Cras congue sem eros, id tristique ex pretium eget.
        In et tellus bibendum ex elementum condimentum a in felis. Cras efficitur ut ipsum in aliquam. Maecenas sed porta dolor. Mauris imperdiet elementum neque in convallis. Donec mi lacus, rhoncus sed feugiat vel, congue ut ipsum. In hac habitasse platea dictumst. Duis blandit ultricies arcu, et bibendum libero pharetra non. Aliquam elementum nisl mauris, ut vestibulum turpis ultrices id. In hac habitasse platea dictumst. Vivamus mattis, ex ac pretium gravida, nisl nisi aliquet libero, ut viverra libero turpis ut sapien. Aliquam commodo gravida sagittis. Quisque in accumsan arcu. Integer bibendum felis nibh, a tempor velit molestie id. Quisque condimentum elit vitae gravida tempor.
        Sed posuere, dui a venenatis mollis, lectus massa aliquet ligula, ac commodo tellus lectus et odio. Praesent finibus dictum dolor vitae ornare. Aenean lacinia bibendum fringilla. Nullam in erat libero. Vivamus quis nisl nisl. Sed eleifend lobortis odio quis elementum. Morbi ultrices quam diam, et pretium justo euismod a. Donec sapien elit, pharetra vel venenatis vel, elementum ac risus. Aliquam sit amet lacus a orci gravida placerat.
        Aliquam rutrum augue at justo aliquet ullamcorper. Nunc laoreet nulla non bibendum posuere. Integer vitae vulputate lacus, ac ullamcorper libero. Duis elementum mi at arcu condimentum, congue venenatis metus commodo. Integer porttitor sapien mi. Curabitur quis vestibulum dui. Duis metus metus, accumsan at faucibus ut, interdum eu purus. Mauris vulputate consectetur sodales. 
        `,
      author: 'un gars pas très futé',
      dateCreated: new Date(),
      dateUploaded: new Date(),
      modificator: 'l\'autre personne',
      dateModificator: new Date(),
      vote: 7
    });
    this.postes.push({
      id: 'bobobobo',
      title: 'Manger avec une pompe à vélo (facile)',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus auctor sem quis varius. Ut tortor mauris, cursus quis rutrum nec, maximus in quam. Aenean porttitor auctor sapien sed molestie. Nam faucibus, felis ac mollis iaculis, tellus ipsum iaculis massa, vitae tempus tortor lectus non ipsum. Duis sit amet magna consequat, feugiat libero eget, ultricies risus. Suspendisse maximus purus ut nulla pellentesque mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In tincidunt dui mollis massa rhoncus eleifend. Vestibulum auctor libero vitae auctor congue. Nullam eu gravida sem, a pulvinar nisl. Nulla vel nunc accumsan massa tincidunt vulputate vel et justo. Sed non est congue, accumsan enim sit amet, cursus purus. Curabitur ligula metus, fringilla nec felis vitae, consequat imperdiet quam. Vivamus aliquam vel felis sed fringilla. Nullam egestas suscipit ex et blandit.
        Donec venenatis arcu vel sodales viverra. Maecenas rhoncus hendrerit enim vel aliquet. Nullam mauris sem, iaculis quis nibh in, molestie pharetra orci. Donec vitae ante vitae nibh venenatis pretium. Integer venenatis est mauris, facilisis ornare odio feugiat sed. Fusce dictum tellus a purus pulvinar, nec imperdiet nisi pretium. Aliquam erat volutpat. Suspendisse varius felis ipsum, ac pulvinar nunc porttitor maximus. Praesent egestas enim metus, sed tempor eros convallis id. Suspendisse potenti. Quisque commodo enim sit amet nunc aliquet ultrices. Fusce ullamcorper sollicitudin metus, non bibendum dolor efficitur in. Cras congue sem eros, id tristique ex pretium eget.
        In et tellus bibendum ex elementum condimentum a in felis. Cras efficitur ut ipsum in aliquam. Maecenas sed porta dolor. Mauris imperdiet elementum neque in convallis. Donec mi lacus, rhoncus sed feugiat vel, congue ut ipsum. In hac habitasse platea dictumst. Duis blandit ultricies arcu, et bibendum libero pharetra non. Aliquam elementum nisl mauris, ut vestibulum turpis ultrices id. In hac habitasse platea dictumst. Vivamus mattis, ex ac pretium gravida, nisl nisi aliquet libero, ut viverra libero turpis ut sapien. Aliquam commodo gravida sagittis. Quisque in accumsan arcu. Integer bibendum felis nibh, a tempor velit molestie id. Quisque condimentum elit vitae gravida tempor.
        Sed posuere, dui a venenatis mollis, lectus massa aliquet ligula, ac commodo tellus lectus et odio. Praesent finibus dictum dolor vitae ornare. Aenean lacinia bibendum fringilla. Nullam in erat libero. Vivamus quis nisl nisl. Sed eleifend lobortis odio quis elementum. Morbi ultrices quam diam, et pretium justo euismod a. Donec sapien elit, pharetra vel venenatis vel, elementum ac risus. Aliquam sit amet lacus a orci gravida placerat.
        Aliquam rutrum augue at justo aliquet ullamcorper. Nunc laoreet nulla non bibendum posuere. Integer vitae vulputate lacus, ac ullamcorper libero. Duis elementum mi at arcu condimentum, congue venenatis metus commodo. Integer porttitor sapien mi. Curabitur quis vestibulum dui. Duis metus metus, accumsan at faucibus ut, interdum eu purus. Mauris vulputate consectetur sodales. 
        `,
      author: 'un gars pas vraiment futé',
      dateCreated: new Date(),
      dateUploaded: new Date(),
      modificator: 'lui là',
      dateModificator: new Date('2020/11/11 12:35:00'),
      vote: 3
    });
  }

  getPostes(): Observable<PosteLight[]> {
    const postes_light: PosteLight[] = this.postes.map(poste => {
      let full_poste = { ...poste };
      delete full_poste.content;
      return full_poste;
    });

    return of(postes_light);
  }

  addPoste(posteData: CreatePoste): Observable<Poste> {
    const newPoste: Poste = {
      ...posteData,
      id: this.postes.length.toString(),
      vote: 0,
      dateCreated: new Date(),
      dateUploaded: new Date(),
      modificator: posteData.author,
      dateModificator: new Date(),
    };

    this.postes.push(newPoste);
    return of(newPoste);
  }

  updatePoste(id: string, posteData: Poste): Observable<Poste> {
    const postIndex = this.postes.findIndex(_ => _.id === id);
    if (postIndex !== -1) {
      this.postes.splice(postIndex, 1, posteData);
      return of(posteData);
    } else {
      return throwError(`Poste avec l'id [${id}] introuvable`);
    }
  }

  deletePoste(id: string): Observable<void> {
    const postIndex = this.postes.findIndex(_ => _.id === id);
    if (postIndex !== -1) {
      this.postes.splice(postIndex, 1);
      return of(undefined);
    } else {
      return throwError(`Poste avec l'id [${id}] introuvable`);
    }
  }

  getPosteById(id: string): Observable<Poste> {
    const poste = this.postes.find(_ => _.id === id);
    if (poste) {
      return of(poste);
    } else {
      return throwError(`Poste avec l'id [${id}] introuvable`);
    }
  }

  isPostOfflineForUser(posteId: string, user: string): Observable<boolean> {
    const hasOfflinePost = this.offlineUserOfflinePostes.some(poste => poste === posteId);
    return of(hasOfflinePost);
  }

  setOfflineStatusPostForUser(posteId: string, user: string, hasAccessOffline: boolean): Observable<void> {
    let posteOfflineIndex = this.offlineUserOfflinePostes.findIndex(poste => poste === posteId);

    if (hasAccessOffline) {
      if (posteOfflineIndex === -1) {
        this.offlineUserOfflinePostes.push(posteId)
      } else {
        // the user has already an offline access for this post 
      }
    } else {
      this.offlineUserOfflinePostes = this.offlineUserOfflinePostes.filter(poste => poste !== posteId);
    }
    return of(undefined);
  }

  setPostVoteForUser(posteId: string, user: string, vote: number): Observable<number> {
    let poste = this.postes.find(poste => poste.id === posteId);
    if (poste) {
      poste.vote += vote - (this.userVotes[posteId] || 0);
      this.userVotes[posteId] = vote;
    } else {
      return throwError(`Impossible de trouver le poste avec l'id [${posteId}]`);
    }

    return of(poste.vote);
  }

  getPostVoteForUser(posteId: string, user: string): Observable<VoteType> {
    const user_vote = this.userVotes[posteId] || 0;
    return of(user_vote);
  }


}
