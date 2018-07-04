import React, { Component } from 'react';
import OverlayForm from 'react-overlay-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
 
class ContactArea extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, subMenuOpen: null, selectedOption: ''};
    this.toggleForm = this.toggleForm.bind(this);
  }
 
  toggleForm() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  toggleSubMenu(index, e) {
    this.setState({ subMenuOpen: index });
  }
  
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }
 
  render() {
	  
	  const { selectedOption } = this.state;
	  
    return (
      <div className={'contactForm ' + (this.state.isOpen ? 'is-active' : '')}>
        <button type="button" className={(this.state.isOpen ? 'is-active' : 'hidden') + ' hamburger--collapse hamburger'} onClick={this.toggleForm}>
        	<img src="/images/contact-message.svg" />
        	<span className="hamburger-box">
		    	<span className="hamburger-inner"></span>
		    </span>
        </button>
        <OverlayForm 
          open={this.state.isOpen} 
          onClose={this.toggleForm}
        >
          <div className="blurb">
          	<h3>How can we help?</h3>
          	<p>Fill in the form below and we will get in touch.</p>
          </div>
          
          <form>
          	<div className="field">
          		<label>Enquiry Type</label>
          		<Select
			        name="enquiryType"
			        value={selectedOption}
			        onChange={this.handleChange}
			        options={[
			          { value: 'one', label: 'One' },
			          { value: 'two', label: 'Two' },
			        ]}
			      />
          	</div>
          	<div className="field">
          		<label>Name</label>
          		<input type="text" name="" placeholder="Please enter your name" />
          	</div>
          	<div className="field">
          		<label>Contact</label>
          		<input type="text" name="" placeholder="Enter an email or Phone no." />
          	</div>
          	<div className="field">
          		<label>Address</label>
          		<input type="text" name="" placeholder="Please enter your address" />
          	</div>
          	<div className="field">
          		<label>Best time to talk</label>
          		<Select
			        name="enquiryType"
			        value={selectedOption}
			        onChange={this.handleChange}
			        options={[
			          { value: 'one', label: 'One' },
			          { value: 'two', label: 'Two' },
			        ]}
			      />
          	</div>
          	<div className="field">
          		<label>Preferred agent</label>
          		<Select
			        name="enquiryType"
			        value={selectedOption}
			        onChange={this.handleChange}
			        options={[
			          { value: 'one', label: 'One' },
			          { value: 'two', label: 'Two' },
			        ]}
			      />
          	</div>
          	
          	<div className="enter">
          		<button>Send enquiry</button>
          	</div>
          </form>
        </OverlayForm>
      </div>
    );
  }
}
 
export default ContactArea;