import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import gsap from "gsap";
import {
  DownloadButtonComponent,
  SvgMorphAnimatorComponent
} from "../../../../../../library-workspace/dist/leo-ui-styles";

type LinkTargetType = 'GITHUB' | 'LINKEDIN' | 'MAIL'

@Component({
  selector: 'connection',
  standalone: true,
  imports: [
    DownloadButtonComponent,
    NgOptimizedImage,
    SvgMorphAnimatorComponent
  ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements AfterViewInit {

  @ViewChild('githubMorph', { read: SvgMorphAnimatorComponent })
  github!: SvgMorphAnimatorComponent

  @ViewChild('linkedInMorph', { read: SvgMorphAnimatorComponent })
  linkedIn!: SvgMorphAnimatorComponent

  @ViewChild('mailMorph', { read: SvgMorphAnimatorComponent })
  mail!: SvgMorphAnimatorComponent

  @ViewChild('avatarRef')
  avatar!: ElementRef<HTMLDivElement>

  @ViewChild('githubRef')
  githubRef!: ElementRef<HTMLAnchorElement>

  @ViewChild('linkedInRef')
  linkedInRef!: ElementRef<HTMLAnchorElement>

  @ViewChild('mailRef')
  mailRef!: ElementRef<HTMLAnchorElement>

  @ViewChild('cvRef', { read: ElementRef })
  cvRef!: ElementRef

  private tl!: any
  private avatarActive = false
  protected avatarShown = false

  ngAfterViewInit() {
    this.initAnimationTimeline()
  }

  playForward() {
    this.avatar.nativeElement.className = 'avatar'
    this.avatarShown = true
    this.tl.play()
  }

  playBackward() {
    this.avatar.nativeElement.className = 'avatar'
    this.avatarActive = false
    this.avatarShown = false
    this.displayLinks()
    this.tl.reverse()
  }

  private initAnimationTimeline() {

    const avatarAnimationPositionX = this.avatar.nativeElement.getBoundingClientRect().left + this.avatar.nativeElement.getBoundingClientRect().width / 2
    const avatarAnimationPositionY = this.avatar.nativeElement.getBoundingClientRect().top + this.avatar.nativeElement.getBoundingClientRect().height / 2

      this.tl = gsap.timeline({paused: true, onComplete: () => {this.glowTimeline(); this.hideLinks(); this.avatarActive = true}, onReverseComplete: () => {this.avatar.nativeElement.classList.remove('puls')}  })
        .to(this.avatar.nativeElement, {
          opacity: 1,
          duration: 1.5,
          ease: 'none'
        }, '<')
        .to(this.githubRef.nativeElement, {
          x: () => avatarAnimationPositionX - this.githubRef.nativeElement.getBoundingClientRect().left,
          y: () => avatarAnimationPositionY - this.githubRef.nativeElement.getBoundingClientRect().top,
          duration: .6,
          ease: 'none'
        }, '<')
        .to(this.githubRef.nativeElement, {
          opacity: 0,
          duration: .1
        }, '>-.1')
        .call(() => this.avatar.nativeElement.classList.add('puls'), undefined, '>-.1')
        .call(() => this.avatar.nativeElement.classList.remove('puls'), undefined, '>.2')
        .to(this.linkedInRef.nativeElement, {
          x: () => avatarAnimationPositionX - this.linkedInRef.nativeElement.getBoundingClientRect().left,
          y: () => avatarAnimationPositionY - this.linkedInRef.nativeElement.getBoundingClientRect().top,
          duration: .6,
          ease: 'none'
        }, '>-.2')
        .to(this.linkedInRef.nativeElement, {
          opacity: 0,
          duration: .1
        }, '>-.1')
        .call(() => this.avatar.nativeElement.classList.add('puls'), undefined, '>-.1')
        .call(() => this.avatar.nativeElement.classList.remove('puls'), undefined, '>.2')
        .to(this.mailRef.nativeElement, {
          x: () => avatarAnimationPositionX - this.mailRef.nativeElement.getBoundingClientRect().left,
          y: () => avatarAnimationPositionY - this.mailRef.nativeElement.getBoundingClientRect().top,
          duration: .6,
          ease: 'none'
        }, '>-.2')
        .to(this.mailRef.nativeElement, {
          opacity: 0,
          duration: .1
        }, '>-.1')
        .call(() => this.avatar.nativeElement.classList.add('puls'), undefined, '>-.1')
        .call(() => this.avatar.nativeElement.classList.remove('puls'), undefined, '>.2')
        .to(this.cvRef.nativeElement, {
          x: () => avatarAnimationPositionX - this.cvRef.nativeElement.getBoundingClientRect().left,
          y: () => avatarAnimationPositionY - this.cvRef.nativeElement.getBoundingClientRect().top,
          duration: .6,
          ease: 'none'
        }, '>-.2')
        .to(this.cvRef.nativeElement, {
          opacity: 0,
          duration: .1
        }, '>-.1')
        .call(() => this.avatar.nativeElement.classList.add('puls'), undefined, '>')
        .call(() => this.avatar.nativeElement.classList.remove('puls'), undefined, '>.2')
        .to(this.avatar.nativeElement, {
          duration: .6,
          left: this.avatarPositionLeft,
          top: this.avatarPositionTop,
          scale: 1,
          ease: 'power1.in'
        })
  }

  private glowTimeline() {
    gsap.timeline()
    .call(() => this.avatar.nativeElement.classList.add('glowing'), undefined, '+=.8')
    .call(() => {this.avatar.nativeElement.classList.remove('glowing'); this.avatar.nativeElement.classList.add('shine')}, undefined, '<7.5')
  }

  private displayLinks() {
    this.githubRef.nativeElement.style.display = 'block'
    this.linkedInRef.nativeElement.style.display = 'block'
    this.mailRef.nativeElement.style.display = 'block'
    this.cvRef.nativeElement.style.display = 'block'
  }

  private hideLinks() {
    this.githubRef.nativeElement.style.display = 'none'
    this.linkedInRef.nativeElement.style.display = 'none'
    this.mailRef.nativeElement.style.display = 'none'
    this.cvRef.nativeElement.style.display = 'none'
  }

  private get avatarPositionLeft(): string {
    if (window.innerWidth > 600) {
      return 'var(--margin-m)'
    } else {
      return `${window.innerWidth - 58}px`
    }
  }

  private get avatarPositionTop(): string {
    if (window.innerWidth > 600) {
      return 'var(--margin-m)'
    } else {
      return `${window.innerHeight - 74}px`
    }
  }

  openExternalLink($event: MouseEvent, link: LinkTargetType) {
    $event.preventDefault()
    switch (link) {
      case "GITHUB":
        this.morphGithub()
        setTimeout(() => this.morphGithubR(), 1000)
        setTimeout(() => window.open('https://github.com/leoDevZh', '_blank'), 500)
        break
      case "LINKEDIN":
        this.morphLinkedIn()
        setTimeout(() => this.morphLinkedInR(), 1000)
        setTimeout(() => window.open('https://www.linkedin.com/in/andrin-fassbind/', '_blank'), 500)
        break
      case "MAIL":
        this.morphMail()
        setTimeout(() => this.morphMailR(), 1000)
        setTimeout(() => window.location.href = "mailto:andrin.fassbind@gmail.com", 500)
        break
    }
  }

  downloadCV() {
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = 'documents/cv.pdf'
      link.download = 'andrin_fassbind_cv.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 500)
  }

  morphGithub() {
    this.github.play()
  }

  morphGithubR() {
    this.github.reverse()
  }

  morphLinkedIn() {
    this.linkedIn.play()
  }

  morphLinkedInR() {
    this.linkedIn.reverse()
  }

  morphMail() {
    this.mail.play()
  }

  morphMailR() {
    this.mail.reverse()
  }

  onAvatarClick() {
    this.playBackward()
    this.avatarActive = true
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.avatarActive && !this.avatarShown) {
      this.playForward()
    }
  }
}
