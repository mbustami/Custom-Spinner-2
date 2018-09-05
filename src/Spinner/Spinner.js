const currentDocument = document.currentScript.ownerDocument;

class CustomSpinner extends HTMLElement {
  constructor() {
    super();
    this.initialOffset = 440;
    this.strokeDashoffset = this.initialOffset;
    this.spin = true;
  }

  setStrokeDashoffset(val) {
    let circleDashOffset = this.shadowRoot.querySelector(".spinner__circle").style.strokeDashoffset;
    if (this.spin) {
      circleDashOffset = val;
    }
  }

  stopSpinning() {
    this.spin = false;
    this.proceed.style.display = "inline-block";
    this.circleSvg.style.animationPlayState = 'paused';
  }

  continueSpinning() {
    this.spin = true;
    this.circleSvg.style.animationPlayState = 'running';
  }

  setStatus(val) {
    this.status.innerHTML = val;
  }

  static get observedAttributes() { 
    return ["offsit"]; 
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(this.spin);
    if (this.spin) {
      this.shadowRoot.querySelector(".spinner__circle").style.strokeDashoffset = newValue;
    }
  }

    // Called when element is inserted in DOM
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});

    // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
    // Current document needs to be defined to get DOM access to imported HTML
    const template = currentDocument.querySelector('#spinner-template');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    // Set Attributes
    this.setAttribute('initialOffset', this.initialOffset);
    this.setAttribute('offsit', this.initialOffset);

    this.stop = this.shadowRoot.querySelector('.spinner__btn--stop');
    this.proceed = this.shadowRoot.querySelector('.spinner__btn--continue');
    this.circleSvg = this.shadowRoot.querySelector('.spinner__svg');
    this.status = this.shadowRoot.querySelector(".spinner__status");
    
    // Event Listeners
    this.stop.addEventListener('click', this.stopSpinning.bind(this));
    this.proceed.addEventListener('click', this.continueSpinning.bind(this));
    
  }



}

customElements.define('custom-spinner', CustomSpinner);