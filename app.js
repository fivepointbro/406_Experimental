//************************************************************************************************************** [MODEL] Deals with data
class Model {
  constructor() {
  	this.staff = [
  		{
  		id: 1, 
  		name: 'Darras', 
  		rank: 'LCol', 
  		position: 'Commanding Officer', 
  		bio: `This is the commanding officer's biography`, 
  		longbio: `Some of these people have really long bios, so this is where that would go.`,
  		imageURL: 'images/CO.jpg',
  		},
  		{
  		id: 2, 
  		name: 'Paquette', 
  		rank: 'CWO', 
  		position: 'Squadron Chief', 
  		bio: `This is the chief's biography`,
  		longbio: `This is definitely one of those people would have a really long biography.`,
  		imageURL: 'images/CWO.jpg',
  		},
  	]
  }
  
  // add a staff member
  addStaff(n, r, p, b, lb, i) {
  	const staffMbr = {
		id: this.staff.length > 0 ? this.staff[this.staff.length - 1].id + 1 : 1,
		name: n,
		rank: r,
		position: p,
		bio: b,
		longbio: lb,
		imageURL: i,
  	}
  	
  	this.staff.push(staffMbr);
  	}
}

//************************************************************************************************************** [VIEW] Deals with the browser
class View {
  constructor() {
  	// grab the main <div> element
  	this.app = this.getElement('#page-content');
  	// create a header
  	this.title = this.createElement('h1');
  	this.title.className = 'text-center';
  	this.title.textContent = 'Showing Off Command Staff';
  	// create the basic list element of command staff
  	this.staffContainer = this.createElement('div', 'd-flex');
  	this.staffContainer.classList.add('justify-content-around');
  	this.staffContainer.id = 'staffContainer';
  	// put the title and the command list into the main div
  	this.app.append(this.title, this.staffContainer);
  }
  
  // create an HTML element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }
  
  // retrieve an HTML element from the DOM (browser)
  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  openModal(staffMbr) {
	const mainModal = this.getElement('#mainModal');
	const modalTitle = this.getElement('#modalTitle');
	const modalText = this.getElement('#modalText');

	modalTitle.innerHTML = `${staffMbr.rank} ${staffMbr.name}`;
	modalText.innerHTML = staffMbr.longbio;
	
	var newModal = new bootstrap.Modal(mainModal);
	newModal.show();
  }
  
  // create and display HTML for the staff
  displayStaff(staff) {
  	// clear off the list before showing the new one
  	while (this.staffContainer.firstChild) {
  		this.staffContainer.removeChild(this.staffContainer.firstChild);
  	}
  	// show a default message if there's no staff to show
  	if (staff.length === 0) {
  		const p = this.createElement('p');
  		p.textContent = 'No staff to show. A Webmaster could add them for you!';
  		this.staffContainer.append(p);
  	} else {
  		// create a "card" for each staff member
  		staff.forEach(staffMbr => {
                const mbrCard = this.createElement('staff-card');
                mbrCard.member = staffMbr;
                this.staffContainer.append(mbrCard);
  		})
  	}
  }
}

//************************************************************************************************************** [CONTROLLER] Links the data with the browser
class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    
    this.onListChanged(this.model.staff);
  }
  
  onListChanged = (staff) => {
  	this.view.displayStaff(staff);
  }
}

const app = new Controller(new Model(), new View());