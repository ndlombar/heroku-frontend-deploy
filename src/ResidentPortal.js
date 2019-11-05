import React, { Component } from 'react';
import StarRatingComponent from "react-star-rating-component";
import CreditCardInput from 'react-credit-card-input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {InputLabel, FormHelperText, FormControl, Select} from '@material-ui/core';
import jsPDF from "jspdf";
import "./ResidentPortal.css";
import "./DefaultStyle.css";

const mapStyles = {
    width: 'calc(33vw - 40px)',
    height: 'calc(33vw - 40px)',
  };

class ResidentPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
			latefee: 15.00,
			user: {
				uid: '1',
				role: 't',
				first_name: 'john',
				last_name: 'doe',
				email: 'stevejed@indiana.edu',
				username: 'johndoe',
				password: 'password',
				statements: [
					{date: '09/27/2019 17:00:00', amount: '$2,375.00'},
					{date: '08/17/2019 17:00:00', amount: '$2,375.00'},
					{date: '07/17/2019 17:00:00', amount: '$2,375.00'},
					{date: '06/17/2019 17:00:00', amount: '$2,375.00'},
					{date: '05/17/2019 17:00:00', amount: '$2,375.00'},
					{date: '04/17/2019 17:00:00', amount: '$2,375.00'},
					{date: '03/17/2019 17:00:00', amount: '$2,375.00'},
				],
				dues: [
					{chargedate: '09/28/2019', reason: 'Service Request (Mold Inquiry)', amount: '$25.00', duedate: '10/31/2019'},
					{chargedate: '10/24/2019', reason: 'Rent', amount: '$1684.85', duedate: '10/31/2019'},
					{chargedate: '09/24/2019', reason: 'Rent', amount: '$1684.85', duedate: '10/01/2019'},
				],
				tickets: [
					{date: '10/24/2019', type: 'repair', priority: 'medium', title: 'Replace Light Bulbs', description: 'Please replace the light bulbs in the garage!', status: 'In-Progress'},
					{date: '09/17/2019', type: 'complaint', priority: 'low', title: 'Rent is too high!', description: 'Rent is too high!  Can you lower it, please?', status: 'Pending'},
					{date: '08/17/2019', type: 'repair', priority: 'high', title: 'Mold in Kitchen', description: 'I saw some weird dark spots in the kitchen that look like mold.', status: 'Closed'},
				],
				coupons: [
					{code: '50OFF', prefix: 'Rent', discount: -0.5},
					{code: 'FREELATE', prefix: 'Late Fee', discount: -1},
				]
			},

			post : {},
			postings : [
				{
					postingID: '12345',
					apartmentInfo: {
						address : '2540 S. Alley St. Bloomington, IN 47403',
						rent : '$4,900',
						rooms : '3',
						bath : '3.5',
						electricity : '$70',
						water : '$100'
					},
					contact: {
						name : 'John Property',
						phoneNumber : '(812)555-5555',
						email : 'johnprops@gmail.com'
					},
					mapLocation: {
						lattitude : '39.1653',
						longitude : '-86.5264'
					},
					amenities: [
						'Pet-Friendly', 'Indoor Pool', 'Free Money!'
					],
					ratings : [
						{username: 'Past Tenant', stars: '3', review: 'This was a pretty cool place to live in when I was here for school.  The environment is pretty loud though, so may be best to avoid if you are not into the party scene.'},
						{username: 'Past Tenant', stars: '1', review: 'loud neighborhood.  AVOID IF YOU ARE A GRAD STUDENTS!!!'},
						{username: 'Past Tenant', stars: '3', review: 'Good place to live if you like to be close to campus, but also close to downtown.  Rent was a little high, though...'}
					]
				},
				{
					postingID: '12346',
					apartmentInfo: {
						address : '1216 N Woodlawn Avenue',
						rent : '$4,900',
						rooms : '3',
						bath : '3.5',
						electricity : '$70',
						water : '$100'
					},
					contact: {
						name : 'John Property',
						phoneNumber : '(812)555-5555',
						email : 'johnprops@gmail.com'
					},
					mapLocation: {
						lattitude : '39.1653',
						longitude : '-86.5264'
					},
					amenities: [
						'Pet-Friendly', 'Indoor Pool', 'Free Money!'
					],
					ratings : [
						{username: 'Past Tenant', stars: '3', review: 'This was a pretty cool place to live in when I was here for school.  The environment is pretty loud though, so may be best to avoid if you are not into the party scene.'},
						{username: 'Past Tenant', stars: '1', review: 'loud neighborhood.  AVOID IF YOU ARE A GRAD STUDENTS!!!'},
						{username: 'Past Tenant', stars: '3', review: 'Good place to live if you like to be close to campus, but also close to downtown.  Rent was a little high, though...'}
					]
				},
				{
					postingID: '12347',
					apartmentInfo: {
						address : '7604 Idlebrook Drive',
						rent : '$4,900',
						rooms : '3',
						bath : '3.5',
						electricity : '$70',
						water : '$100'
					},
					contact: {
						name : 'John Property',
						phoneNumber : '(812)555-5555',
						email : 'johnprops@gmail.com'
					},
					mapLocation: {
						lattitude : '39.1653',
						longitude : '-86.5264'
					},
					amenities: [
						'Pet-Friendly', 'Indoor Pool', 'Free Money!'
					],
					ratings : [
						{username: 'Past Tenant', stars: '3', review: 'This was a pretty cool place to live in when I was here for school.  The environment is pretty loud though, so may be best to avoid if you are not into the party scene.'},
						{username: 'Past Tenant', stars: '1', review: 'loud neighborhood.  AVOID IF YOU ARE A GRAD STUDENTS!!!'},
						{username: 'Past Tenant', stars: '3', review: 'Good place to live if you like to be close to campus, but also close to downtown.  Rent was a little high, though...'}
					]
				}
			]
        };
		
		var postId = 12346;
		
		for(var i = 0; i < this.state.postings.length; i++) {
			var obj = this.state.postings[i];
			if(postId == obj.postingID) {
				
				this.state.post  = obj;
				console.log(this.state.post);
			}
			
		}

		/* gets the dues for the rent */
		// TODO: Either do this in backend or set up validation component for this not add fee if already added
		var latefees = []
		var today = new Date();
		var todayYear = parseInt(today.getFullYear());
		var todayMonth = today.getMonth()+1;
		var todayDate = today.getDate();

		for(var i = 0; i <  this.state.user.dues.length; i++) {
			if(this.state.user.dues[i].reason !== 'Rent')
				continue;
			
			var rentYear = parseInt(this.state.user.dues[i].duedate.substring(6));
			var rentMonth = parseInt(this.state.user.dues[i].duedate.substring(0,2));
			var rentDate = parseInt(this.state.user.dues[i].duedate.substring(3,5));

			var diffYears = parseInt(todayYear - rentYear);
			var diffMonths = parseInt(todayMonth - rentMonth);
			var diffDate = todayDate > rentDate ? 1 : 0;
			var latePeriods = diffYears * 12 + diffMonths + diffDate;

			for(var fee = 0; fee < latePeriods; fee++)
			{
				latefees.push(
					{chargedate: this.getFormattedDate(new Date()),
					 reason: 'Late Fee (Rent: ' + this.state.user.dues[i].chargedate + ')',
					 amount: '$' + (this.state.latefee).toFixed(2),
					 duedate: '',
					}
				);
			}
		}

		this.state.user.dues.push.apply(this.state.user.dues,latefees);
	}

  render() {
    return (
    <div class="primary-container">
            <main class="body">
                <div class="residentportal-container">
                    <div class="dues">
						<Dues
							statements={this.state.user.statements}
							dues={this.state.user.dues}
							coupons={this.state.user.coupons}
							/>
                    </div>
                    <div class="service">
						<ServiceRequests
							tickets={this.state.user.tickets}
						/>
                    </div>
                    <div class="rightside1">
                        <div class="contact1">
                            <div class="contact-display">
                                <img class="contact-portrait" src={require("./logo.svg")} alt="logo"/>
                                <div class="contact-info">
                                    <h4>{this.state.post.contact.name}<br/></h4>
                                    <i>{this.state.post.contact.phoneNumber}<br/><br/></i>
                                    <i>{this.state.post.contact.email}<br/></i>
                                </div>
                            </div>
                        </div>
                        <div class="ratemyproperty">
                            <PropertyReview />
                        </div>
                    </div>
                </div>
            </main>


            <footer class="footer"></footer>
    </div>
      );
  }

  getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}
}




/*******************************************************************************
 * 							CLASSES FOR: DUES + PAYMENTS
 *******************************************************************************
 */

/*Handles the My Statement section functionality of the resident portal*/
class Dues extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMakeAPayment: false,
			showSetUpRecurringPayment: false,
			showMyStatements: false,
		};
	}

	handleGeneratePDF(paymentdate, amount) {
		var doc = jsPDF('p', 'pt');
		doc.setFontSize(22);
		//import data from other page;
		doc.text(200, 20, "Title:");
		doc.setFontSize(14);
		doc.text(200, 70, "Payment Date: " + paymentdate);
		doc.text(200, 45, "Payment Amount: " + amount);
		doc.text(200, 95, "Due Date: ");
		doc.text(200, 120, "Payment Method: ");
		doc.text(200, 145, "Description: ");
		doc.save("rentmate_statements.pdf");
	}

	getTotalDues(dues){
		var summed = 0.00;
		for(let item in dues)
		{
			summed += parseFloat(dues[item].amount.slice(1))
		}
		return summed.toFixed(2);
	}

	getMinimumDate(dues){
		for(let item in dues)
		{
			if(dues[item].reason === 'Rent')
				return dues[item].duedate;
		}
		return 'XX/XX/XXXX'
	}

	render() {
		{/* maps the statements from the Dues component */}
        var statements = this.props.statements.map(function(obj) {
			return {date: obj.date, amount: obj.amount}
		});
		var dues = this.props.dues.map(function(obj) {
			return {chargedate: obj.chargedate,
					reason: obj.reason,
					amount: obj.amount,
					duedate: obj.duedate}
		});
		var coupons = this.props.coupons.map(function(obj) {
			return {code: obj.code,
					prefix: obj.prefix,
					discount: obj.discount}
		});

		return (
			<div class="mystatement-container">
			<h3>My Statement</h3>
			<div class="amountdue">
				<h3 >Current Balance:</h3>
				<h3>{'$' + this.getTotalDues(dues)}</h3>
				Due by: {this.getMinimumDate(dues)}
			</div>
			<div class="buttons">
				<button
					class="primary-button"
					onClick={this.togglePopupMakeAPayment.bind(this)}>
						Make a Payment
				</button>
				
				{this.state.showMakeAPayment ?  
					<MakeAPayment
							dues={dues}
							coupons={coupons}
							closePopup={this.togglePopupMakeAPayment.bind(this)}  
					/>  
					: null  
				}
				<br />
				<button
					class="secondary-button"
					onClick={this.togglePopupSetUpRecurringPayment.bind(this)}>
						Set Up Recurring Payment
				</button>
				{this.state.showSetUpRecurringPayment ?  
					<SetUpRecurringPayment
							coupons={coupons}
							closePopup={this.togglePopupSetUpRecurringPayment.bind(this)}  
					/>  
					: null  
				}

				<br />
				<button
					class="secondary-button"
					onClick={this.togglePopupMyStatements.bind(this)}>
						My Statements
				</button>
				{this.state.showMyStatements ?  
					<MyStatements
							statements={statements}
							closePopup={this.togglePopupMyStatements.bind(this)}  
					/>  
					: null  
				}
			</div>
			<h3>Recent Statements</h3>
			<div class="recentstatements">
				{statements.slice(0, 3).map((data) =>
					<div class="recentstatements-item">
						<div class = "recentstatements-item-date">{data.date.substring(0, 10)}</div>
						<div class = "recentstatements-item-amount">{data.amount}</div>
						<div class = "recentstatements-item-button">
							<button 
								class="secondary-button"
								onClick={() => this.handleGeneratePDF(data.date, data.amount)}>
								PDF
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
		);
	}

	togglePopupMakeAPayment() { this.setState({ showMakeAPayment: !this.state.showMakeAPayment }); }
	
	togglePopupSetUpRecurringPayment() { this.setState({ showSetUpRecurringPayment: !this.state.showSetUpRecurringPayment }); } 

	togglePopupMyStatements() { this.setState({ showMyStatements: !this.state.showMyStatements }); } 
}

class MakeAPayment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardNumber: '',
			cardExpiry: '',
			cardCvc: '',
			billFirstName: '',
			billLastName: '',
			billAddrLine1: '',
			billAddrLine2: '',
			billCity: '',
			billState: '',
			coupon: '',

			//prop variables
			dues: [],
			coupons: [],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	  }
	
	  handleSubmit(event) {
		if(this.state.cardNumber === '' || this.state.cardExpiry === '' ||
			this.state.cardCvc === '' ||
			this.state.billFirstName === '' || this.state.billLastName === '' ||
			this.state.billAddrLine1 === '' ||
			this.state.city === '' || this.state.state === '')
		{
			alert('WARNING: Invalid Payment Information.\n\nPlease ensure all information is provided.');
			return;
		}
		
		alert('cardinfo:'
			+ '\n-cardNumber: ' + this.state.cardNumber
			+ '\n-expiry: ' + this.state.cardExpiry
			+ '\n-cvc: ' + this.state.cardCvc
			+ '\nbilling:'
			+ '\n-billfirstname: ' + this.state.billFirstName
			+ '\n-billlastname: ' + this.state.billLastName
			+ '\n-billaddrline1: ' + this.state.billAddrLine1
			+ '\n-billaddrline2: ' + this.state.billAddrLine2
			+ '\n-billcity: ' + this.state.billCity
			+ '\n-billstate: ' + this.state.billState
			+ '\ncoupon: ' + this.state.coupon
		)

		//TODO: update coupon to sum up discount effect for itemization of payment statement (ex: '50OFF -$685.32')

		//get the current coupon, if one exists
		var coupon = '';
		for(let c in this.state.coupons)
		{
			if(this.state.coupon === this.state.coupons[c].code)
			{
				coupon = this.state.coupons[c];
				break;
			}
		}

		var total = 0.00;
		for(let charge in this.state.dues)
		{
			var currCharge = 0.00;
			if(coupon !== '' &&
				this.state.dues[charge].reason.substring(0,coupon.prefix.length) === coupon.prefix)
			{
				currCharge = parseFloat(this.state.dues[charge].amount.substring(1)) * (1 + coupon.discount)
			}
			else
				currCharge = parseFloat(this.state.dues[charge].amount.substring(1))

			total += currCharge;
		}

		alert('total: ' + total.toFixed(2));

		//TODO: Backend operation on successful payment

		alert('Payment successfully made!');
		this.props.closePopup()
		event.preventDefault();
	  }

	
	getTotalDues(dues){
		var summed = 0.00;
		for(let item in dues)
		{
			summed += parseFloat(dues[item].amount.slice(1))
		}
		return summed.toFixed(2);
	}

	getMinimumDate(dues){
		for(let item in dues)
		{
			if(dues[item].reason === 'Rent')
				return dues[item].duedate;
		}
		return 'XX/XX/XXXX'
	}
	
	render() {
		var dues = this.props.dues.map(function(obj) {
			return {chargedate: obj.chargedate,
					reason: obj.reason,
					amount: obj.amount,
					duedate: obj.duedate}
		});
		var coupons = this.props.coupons.map(function(obj) {
			return {code: obj.code,
					prefix: obj.prefix,
					discount: obj.discount}
		});
		this.state.dues = dues;
		this.state.coupons = coupons;

		return (  
			<div className='popup'>  
				<div className='popup-panel'>
					<div class="makeapayment-container">
						<div class="popup-header">
							<h3 class="popup-header-title">Make a Payment</h3>
							<Button variant="outlined"
								onClick={this.props.closePopup}>
									Close
							</Button>  
						</div>
						<div class="amountdue">
							<h3>Current Balance:</h3>
							<h3>{this.getTotalDues(dues)}</h3>
							Due by: {this.getMinimumDate(dues)}
						</div>
						<h4>Charges</h4>
						<div class="charges">
							{dues.map((data) =>
								<div class="charges-item">
									<div class = "charges-item-date">{data.chargedate.substring(0,10)}</div>
									<div class = "charges-item-reason">{data.reason}</div>
									<div class = "charges-item-amount">{data.amount}</div>
								</div>
							)}
						</div>
						<h4>Payment Information</h4>
						<div class="paymentinfo">
							<div class="paymentinfo-billing">
								<u>Card Information</u>
								<CreditCardInput
									cardNumberInputProps={{ value: CreditCardInput.cardNumber, name: 'cardNumber', onChange: this.handleCardNumberChange, onInput: this.handleInputChange }}
									cardExpiryInputProps={{ value: CreditCardInput.expiry, name: 'cardExpiry', onChange: this.handleCardExpiryChange, onInput: this.handleInputChange }}
									cardCVCInputProps={{ value: CreditCardInput.cvc, name: 'cardCvc', onChange: this.handleCardCVCChange, onInput: this.handleInputChange }}
									fieldClassName="creditcard"
									class="paymentinfo-card"
								/>
								<u>Billing Address</u>
								<br />
								<form autoComplete="off">
									<TextField
										label="First Name"
										name="billFirstName"
										margin="dense"
										variant="outlined"
										value={this.state.billFirstName}
										onChange={this.handleInputChange}
									/>
									<TextField
										label="Last Name"
										name="billLastName"
										margin="dense"
										variant="outlined"
										value={this.state.billLastName}
										onChange={this.handleInputChange}
									/>
									{/* TODO: Fix the Scaling Alignment with the Addr Lines */}
									<TextField
										label="Addr Line 1"
										name="billAddrLine1"
										fullWidth
										margin="dense"
										variant="outlined"
										value={this.state.billAddrLine1}
										onChange={this.handleInputChange}
									/>
									<TextField
										label="Addr Line 2"
										name="billAddrLine2"
										fullWidth
										margin="dense"
										variant="outlined"
										value={this.state.billAddrLine2}
										onChange={this.handleInputChange}
									/>
									<TextField
										label="City"
										name="billCity"
										margin="dense"
										variant="outlined"
										value={this.state.billCity}
										onChange={this.handleInputChange}
									/>
									{/* TODO: Make this a select with the states */}
									<TextField
										label="State"
										name="billState"
										margin="dense"
										variant="outlined"
										value={this.state.billState}
										onChange={this.handleInputChange}
									/>
								</form>
							</div>
							<div class="paymentinfo-discount">
								<u>Coupon Code</u>
								<br />
								<i>Available Codes:</i>
								{coupons.map((data) =>
									<i><br />{data.code} -> {(data.discount * 100).toFixed(0)}% on '{data.prefix}'</i>
								)}
								<br />
								<TextField
									label="Coupon Code"
									name="coupon"
									margin="dense"
									variant="outlined"
									value={this.state.coupon}
									onChange={this.handleInputChange}
								/>
							</div>
						</div>
						<div class="buttons">
							<button type="button"
								class="primary-button"
								onClick={this.handleSubmit}>
									Make a Payment
							</button>
						</div>
					</div>
				</div>  
			</div>  
		);  
  }
}

class SetUpRecurringPayment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: Push monthly charges up to user
			monthlycharges: [
				{reason: 'Rent', amount: '$1684.85'},
			],
			cardNumber: '',
			cardExpiry: '',
			cardCvc: '',
			billFirstName: '',
			billLastName: '',
			billAddrLine1: '',
			billAddrLine2: '',
			billCity: '',
			billState: '',
			coupon: '',

			//prop variables
			coupons: [],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSetUpRecurringPayment = this.handleSetUpRecurringPayment.bind(this);
		this.handleCancelRecurringPayment = this.handleCancelRecurringPayment.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	  }
	
	handleSetUpRecurringPayment(event) {
		if(this.state.cardNumber === '' || this.state.cardExpiry === '' ||
			this.state.cardCvc === '' ||
			this.state.billFirstName === '' || this.state.billLastName === '' ||
			this.state.billAddrLine1 === '' ||
			this.state.city === '' || this.state.state === '')
		{
			alert('WARNING: Invalid Payment Information.\n\nPlease ensure all information is provided.');
			return;
		}

		alert('cardinfo:'
			+ '\n-cardNumber: ' + this.state.cardNumber
			+ '\n-expiry: ' + this.state.cardExpiry
			+ '\n-cvc: ' + this.state.cardCvc
			+ '\nbilling:'
			+ '\n-billfirstname: ' + this.state.billFirstName
			+ '\n-billlastname: ' + this.state.billLastName
			+ '\n-billaddrline1: ' + this.state.billAddrLine1
			+ '\n-billaddrline2: ' + this.state.billAddrLine2
			+ '\n-billcity: ' + this.state.billCity
			+ '\n-billstate: ' + this.state.billState
			+ '\ncoupon: ' + this.state.coupon
		)

		//TODO: update coupon to sum up discount effect for itemization of payment statement (ex: '50OFF -$685.32')

		//get the current coupon, if one exists
		var coupon = '';
		for(let c in this.state.coupons)
		{
			if(this.state.coupon === this.state.coupons[c].code)
			{
				coupon = this.state.coupons[c];
				break;
			}
		}

		var total = 0.00;
		for(let charge in this.state.monthlycharges)
		{
			var currCharge = 0.00;
			if(coupon !== '' &&
				this.state.monthlycharges[charge].reason.substring(0,coupon.prefix.length) === coupon.prefix)
			{
				currCharge = parseFloat(this.state.monthlycharges[charge].amount.substring(1)) * (1 + coupon.discount)
			}
			else
				currCharge = parseFloat(this.state.monthlycharges[charge].amount.substring(1))

			total += currCharge;
		}

		alert('total: ' + total.toFixed(2));

		// TODO: Set up Backend connection for recurring payment

		alert('Recurring Payment successfully set up!'
			  + '\n\nYou can cancel it at any time by: '
			  + '\n1. Accessing the \'Set Up Recurring Payment\' menu'
			  + '\n2. pressing \'Cancel Recurring Payment\'.');

		this.props.closePopup();
		event.preventDefault();
	}

	handleCancelRecurringPayment(event) {
		var response = window.confirm('Are you sure you wish to cancel your recurring payment?');
		if(response == false) {
			return;
		}

		// TODO: Set up Backend connection for recurring payment

		alert('Recurring Payment successfully cancelled.'
		+ '\n\nYou can set it back up at any time by: '
		+ '\n1. Accessing the \'Set Up Recurring Payment\' menu'
		+ '\n2. Enter in your payment information'
		+ '\n2. pressing \'Set Up Recurring Payment\'.');

		this.props.closePopup();
		event.preventDefault();
	}

	render() {
		var coupons = this.props.coupons.map(function(obj) {
			return {code: obj.code,
					prefix: obj.prefix,
					discount: obj.discount}
		});
		this.state.coupons = coupons;

		return (  
			<div className='popup'>  
				<div className='popup-panel'>
					<div class="makeapayment-container">
						<div class="popup-header">
							<h3 class="popup-header-title">Set Up Recurring Payment</h3>
							<Button variant="outlined"
								onClick={this.props.closePopup}>
									Close
							</Button>  
						</div>
						<h4>Monthly Charges</h4>
						<div class="charges">
							{this.state.monthlycharges.map((data) =>
								<div class="charges-item">
									<div class = "charges-item-reason">{data.reason}</div>
									<div class = "charges-item-amount">{data.amount}</div>
								</div>
							)}
						</div>
						<h4>Payment Information</h4>
						<div class="paymentinfo">
							<div class="paymentinfo-billing">
								<u>Card Information</u>
								{/* TODO: Get CreditCard info to state */}
								<CreditCardInput
									cardNumberInputProps={{ value: CreditCardInput.cardNumber, name: 'cardNumber', onChange: this.handleCardNumberChange, onInput: this.handleInputChange }}
									cardExpiryInputProps={{ value: CreditCardInput.expiry, name: 'cardExpiry', onChange: this.handleCardExpiryChange, onInput: this.handleInputChange }}
									cardCVCInputProps={{ value: CreditCardInput.cvc, name: 'cardCvc', onChange: this.handleCardCVCChange, onInput: this.handleInputChange }}
									fieldClassName="creditcard"
									class="paymentinfo-card"
								/>
								<u>Billing Address</u>
								<br />
								<form autoComplete="off">
									<TextField
										label="First Name"
										name="billFirstName"
										margin="dense"
										variant="outlined"
										value={this.state.billFirstName}
										onChange={this.handleInputChange}
									/>
									<TextField
										label="Last Name"
										name="billLastName"
										margin="dense"
										variant="outlined"
										value={this.state.billLastName}
										onChange={this.handleInputChange}
									/>
									{/* TODO: Fix the Scaling Alignment with the Addr Lines */}
									<TextField
										label="Addr Line 1"
										name="billAddrLine1"
										fullWidth
										margin="dense"
										variant="outlined"
										value={this.state.billAddrLine1}
										onChange={this.handleInputChange}
									/>
									<TextField
										label="Addr Line 2"
										name="billAddrLine2"
										fullWidth
										margin="dense"
										variant="outlined"
										value={this.state.billAddrLine2}
										onChange={this.handleInputChange}
									/>
									<TextField
										label="City"
										name="billCity"
										margin="dense"
										variant="outlined"
										value={this.state.billCity}
										onChange={this.handleInputChange}
									/>
									{/* TODO: Make this a select with the states */}
									<TextField
										label="State"
										name="billState"
										margin="dense"
										variant="outlined"
										value={this.state.billState}
										onChange={this.handleInputChange}
									/>
								</form>
							</div>
							<div class="paymentinfo-discount">
								<u>Coupon Code</u>
								<br />
								<i>Available Codes:</i>
								{coupons.map((data) =>
									<i><br />{data.code} -> {(data.discount * 100).toFixed(0)}% on '{data.prefix}'</i>
								)}
								<br />
								<TextField
									label="Coupon Code"
									name="coupon"
									margin="dense"
									variant="outlined"
									value={this.state.coupon}
									onChange={this.handleInputChange}
								/>
							</div>
						</div>
						<div class="buttons">
							<button type="button"
								class="primary-button"
								onClick={this.handleSetUpRecurringPayment}>
									Set Up Recurring Payment
							</button>
							<button type="button"
								class="secondary-button"
								onClick={this.handleCancelRecurringPayment}>
									Cancel Recurring Payment
							</button>
						</div>
					</div>
				</div>  
			</div>  
		);  
  }
}

/* Handles the popup window for 'My Statements'
 */
class MyStatements extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	handleGeneratePDF(paymentdate, amount) {
		var doc = jsPDF('p', 'pt');
		doc.setFontSize(22);
		//import data from other page;
		doc.text(200, 20, "Title:");
		doc.setFontSize(14);
		doc.text(200, 70, "Payment Date: " + paymentdate);
		doc.text(200, 45, "Payment Amount: " + amount);
		doc.text(200, 95, "Due Date: ");
		doc.text(200, 120, "Payment Method: ");
		doc.text(200, 145, "Description: ");
		doc.save("rentmate_statements.pdf");
	}
	
	render() {
		{/* maps the statements from the Dues component */}
        var statements = this.props.statements.map(function(obj) {
			return {date: obj.date, amount: obj.amount}
		});

		return (

			<div className='popup'>  
				<div className='popup-panel'>
					<div class="makeapayment-container">
						<div class="popup-header">
							<h3 class="popup-header-title">My Statements</h3>
							<Button variant="outlined"
								onClick={this.props.closePopup}>
									Close
							</Button>  
						</div>
						<br /><br />
						<div class="recentstatements">
							{statements.map((data) =>
								<div class="recentstatements-item">
									<div class = "recentstatements-item-date">{data.date}</div>
									<div class = "recentstatements-item-amount">{data.amount}</div>
									{/* TODO: Set up connection to download PDF of statement */}
									<div class = "recentstatements-item-button">
										<button 
											class="secondary-button"
											onClick={() => this.handleGeneratePDF(data.date, data.amount)}>
											PDF
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>  
			</div>  
		);  
  }
}

/*Handles the 'Rate My Property' functionality of the Resident Portal
 */
class PropertyReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewing: '',
			rating: 0,
			review: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	  }
	
	  handleSubmit(event) {
		if(this.state.reviewing === '' || this.state.rating === 0 || this.state.review === '')
		{
			alert('WARNING: Invalid Review\n\nPlease fill out a full review before submitting.');
			return;
		}

		// TODO: Send Review to Backend

		alert('reviewing: ' + this.state.reviewing + '\nrating: ' + this.state.rating + '\nreview: ' + this.state.review);
		alert('Review submitted!\n\nYou can update your review at any time by sending another review.');
		event.preventDefault();
	  }

	onStarClick(nextValue, prevValue, name) {
		this.setState({rating: nextValue});
	}

    render()
    {
        return (
			<div>
				<h3> Rate My Property</h3>
				<form class="rate-container" onSubmit={this.handleSubmit}>
					<div style={{width: '100%'}}>
						<FormControl required>
							<InputLabel htmlFor="reviewing-native-required">Reviewing</InputLabel>
							<Select
								native
								value={this.state.reviewing}
								onChange={this.handleInputChange}
								class="rate-reviewing"
								name="reviewing"
								inputProps={{
									id: 'reviewing-native-required',
								}}
							>
								<option value="" />
								<option value={'manager'}>Manager</option>
								<option value={'property'}>Property</option>
							</Select>
							<FormHelperText>Required</FormHelperText>
						</FormControl>
					</div>
					<div style={{width: '100%', fontSize: 70, textAlign: "center", marginBottom: '20px'}}>
						<StarRatingComponent
							class="rate-rating"
							name='rating'
							starCount={5}
							starColor={'orange'}
							onStarClick={this.onStarClick.bind(this)}/>
						<FormHelperText>Required</FormHelperText>
					</div>
					<FormControl required style={{width: '100%'}}>
						<TextField
								name="review"
								variant="outlined"
								multiline
								rows="4"
								fullWidth='true'
								value={this.state.review}
								onChange={this.handleInputChange} />
						<FormHelperText>Required</FormHelperText>
					</FormControl>
					<div style={{width: '100%'}}>
						<br />
					</div>
					<Button
						class="rate-submit"
						onClick={this.handleSubmit}>
						Submit Review
					</Button>
				</form>
			</div>
        );
    }
}





/*******************************************************************************
 * 							CLASSES FOR: SERVICE REQUESTS 
 *******************************************************************************
 */

class ServiceRequests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPlaceServiceRequest: false,
			showPlaceComplaint: false,
			showMyTickets: false,
			showTicket: false,
			ticketInfo: {},
		};
	}

	handleGeneratePDF(paymentdate, amount) {
		alert('PDF Data\n--------'
			+ '\n-> paymentdate: ' + paymentdate
			+ '\n-> amount: ' + amount
			);
		// TODO: Set up call to Backend for PDF generation + download
	}

	getTotalActiveTickets(tickets){
		var active_count = 0;
		for(let item in tickets)
		{
			if(tickets[item].status !== 'Closed')
				active_count += 1;
		}
		return active_count;
	}

	render() {
		var tickets = this.props.tickets.map(function(obj) {
			return {date: obj.date,
					type: obj.type,
					priority: obj.priority,
					title: obj.title,
					description: obj.description,
					status: obj.status,
				}
		});

		return (
			<div class="mystatement-container">
			<h3>Service Requests</h3>
			<div class="amountdue">
				<h3>Active Tickets:</h3>
				<h3>{this.getTotalActiveTickets(tickets)}</h3>
			</div>
			<div class="buttons">
				<button
					class="primary-button"
					onClick={this.togglePopupPlaceServiceRequest.bind(this)}>
						Place a Service Request Ticket
				</button>
				
				{this.state.showPlaceServiceRequest ?  
					<PlaceServiceRequest
							closePopup={this.togglePopupPlaceServiceRequest.bind(this)}  
					/>  
					: null  
				}
				<br />
				<button
					class="secondary-button"
					onClick={this.togglePopupPlaceComplaint.bind(this)}>
						Place a Complaint Ticket
				</button>
				{this.state.showPlaceComplaint ?  
					<PlaceComplaintTicket
							closePopup={this.togglePopupPlaceComplaint.bind(this)}  
					/>  
					: null  
				}

				<br />
				<button
					class="secondary-button"
					onClick={this.togglePopupMyTickets.bind(this)}>
						My Tickets
				</button>
				{this.state.showMyTickets ?  
					<MyTickets
							tickets={tickets}
							closePopup={this.togglePopupMyTickets.bind(this)}  
					/>  
					: null  
				}
			</div>
			<h3>Recent Tickets</h3>
			<div class="recentstatements">
				{tickets.slice(0, 3).map((data) =>
					<div class="recentstatements-item">
						<div class = "recentstatements-item-date">{data.date.substring(0, 10)}</div>
						<div class = "recentstatements-item-amount">
							{/* TODO: Set up some way of dynamically scaling text to not overflow to next line */}
							{data.title.substring(0, 12) + (data.title.length > 12 ? '...' : '')}
						</div>
						<div class = "recentstatements-item-button">
							<button 
								class="secondary-button"
								onClick={this.togglePopupTicket.bind(this, data)}>
								View Ticket
							</button>
							{this.state.showTicket ?  
								<Ticket
										ticket={this.state.ticketInfo}
										closePopup={this.togglePopupTicket.bind(this, {})}  
								/>  
								: null  
							}
						</div>
					</div>
				)}
			</div>
		</div>
		);
	}

	togglePopupPlaceServiceRequest() { this.setState({showPlaceServiceRequest : !this.state.showPlaceServiceRequest});}

	togglePopupPlaceComplaint() { this.setState({showPlaceComplaint : !this.state.showPlaceComplaint});}

	togglePopupMyTickets() { this.setState({showMyTickets : !this.state.showMyTickets});}

	togglePopupTicket(ticket) {
		this.setState({showTicket : !this.state.showTicket});
		this.setState({ticketInfo : ticket});
	}
}

class PlaceServiceRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			priority: '',
			title: '',
			description: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	  }
	
	  handleSubmit(event) {
		if(this.state.type === '' || this.state.priority === '' ||
			this.state.title === '' || this.state.description === '')
		{
			alert('WARNING: Incomplete Ticket.\n\nPlease ensure all information is provided.');
			return;
		}

		//TODO: Backend operation on successful ticket placement

		alert('type: ' + this.state.type
			  + '\npriority: ' + this.state.priority
			  + '\ntitle: ' + this.state.title
			  + '\ndescription: ' + this.state.description
			)
		alert('Request ticket successfully placed!');
		this.props.closePopup()
		event.preventDefault();
	  }
	
	render() {
		return (  
			<div className='popup'>  
				<div className='popup-panel'>
					<div class="makeapayment-container">
						<div class="popup-header">
							<h3 class="popup-header-title">Service Request Ticket</h3>
							<Button variant="outlined"
								onClick={this.props.closePopup}>
									Close
							</Button>  
						</div>
						<form class="rate-container" onSubmit={this.handleSubmit}>
							<h4>Request Type</h4>
							<div style={{width: '100%', marginBottom: 10}}>
								<FormControl required>
									<InputLabel htmlFor="reviewing-native-required">Type</InputLabel>
									<Select
										native
										value={this.state.type}
										onChange={this.handleInputChange}
										class="rate-reviewing"
										name="type"
										inputProps={{
											id: 'reviewing-native-required',
										}}
										fullWidth='true'
									>
										<option value="" />
										<option value={'repair'}>Repair</option>
									</Select>
									<FormHelperText>Required</FormHelperText>
								</FormControl>
							</div>
							<div style={{width: '100%'}}>
								<FormControl required>
									<InputLabel htmlFor="reviewing-native-required">Priority</InputLabel>
									<Select
										native
										value={this.state.priority}
										onChange={this.handleInputChange}
										class="rate-reviewing"
										name="priority"
										inputProps={{
											id: 'reviewing-native-required',
										}}
									>
										<option value="" />
										<option value={'low'}>Low</option>
										<option value={'medium'}>Medium</option>
										<option value={'high'}>High</option>
										<option value={'urgent'}>Urgent</option>
									</Select>
									<FormHelperText>Required</FormHelperText>
								</FormControl>
							</div>
							<h4>Request Information</h4>
							<FormControl required style={{width: '100%', marginBottom: 10}}>
								<TextField
										label="Title"
										name="title"
										variant="outlined"
										fullWidth='true'
										value={this.state.title}
										onChange={this.handleInputChange} />
								<FormHelperText>Required</FormHelperText>
							</FormControl>
							<FormControl required style={{width: '100%', marginBottom: 10}}>
								<TextField
										label="Ticket Description"
										name="description"
										variant="outlined"
										multiline
										rows="4"
										fullWidth='true'
										value={this.state.description}
										onChange={this.handleInputChange} />
								<FormHelperText>Required</FormHelperText>
							</FormControl>
							<div style={{width: '100%'}}>
								<br />
							</div>
							<h4>Request Charges</h4>
							<div style={{width: '100%', marginBottom: 30}}>
								<i>NOTE: Service Requests incur an hourly labor rate ($25/hr) based on hours worked.</i>
							</div>
							<Button
								class="rate-submit"
								onClick={this.handleSubmit}>
								Place Ticket
							</Button>
						</form>
					</div>
				</div>  
			</div>  
		);  
  }
}

class PlaceComplaintTicket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priority: '',
			title: '',
			description: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	  }
	
	  handleSubmit(event) {
		if(this.state.priority === '' || this.state.title === '' || this.state.description === '')
		{
			alert('WARNING: Incomplete Ticket.\n\nPlease ensure all information is provided.');
			return;
		}

		//TODO: Backend operation on successful ticket placement

		alert('priority: ' + this.state.priority
			  + '\ntitle: ' + this.state.title
			  + '\ndescription: ' + this.state.description
			)
		alert('Request ticket successfully placed!');
		this.props.closePopup()
		event.preventDefault();
	  }
	
	render() {
		return (  
			<div className='popup'>  
				<div className='popup-panel'>
					<div class="makeapayment-container">
						<div class="popup-header">
							<h3 class="popup-header-title">Complaint Ticket</h3>
							<Button variant="outlined"
								onClick={this.props.closePopup}>
									Close
							</Button>  
						</div>
						<form class="rate-container" onSubmit={this.handleSubmit}>
							<h4>Complaint Priority</h4>
							<div style={{width: '100%'}}>
								<FormControl required>
									<InputLabel htmlFor="reviewing-native-required">Priority</InputLabel>
									<Select
										native
										value={this.state.priority}
										onChange={this.handleInputChange}
										class="rate-reviewing"
										name="priority"
										inputProps={{
											id: 'reviewing-native-required',
										}}
									>
										<option value="" />
										<option value={'low'}>Low</option>
										<option value={'medium'}>Medium</option>
										<option value={'high'}>High</option>
										<option value={'urgent'}>Urgent</option>
									</Select>
									<FormHelperText>Required</FormHelperText>
								</FormControl>
							</div>
							<h4>Request Information</h4>
							<FormControl required style={{width: '100%', marginBottom: 10}}>
								<TextField
										label="Title"
										name="title"
										variant="outlined"
										fullWidth='true'
										value={this.state.title}
										onChange={this.handleInputChange} />
								<FormHelperText>Required</FormHelperText>
							</FormControl>
							<FormControl required style={{width: '100%', marginBottom: 30}}>
								<TextField
										label="Ticket Description"
										name="description"
										variant="outlined"
										multiline
										rows="4"
										fullWidth='true'
										value={this.state.description}
										onChange={this.handleInputChange} />
								<FormHelperText>Required</FormHelperText>
							</FormControl>
							<Button
								class="rate-submit"
								onClick={this.handleSubmit}>
								Place Ticket
							</Button>
						</form>
					</div>
				</div>  
			</div>  
		);  
  }
}

class MyTickets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showTicket: false,
			ticketInfo: {},
		};
	}

	handleGeneratePDF(paymentdate, amount) {
		alert('PDF Data\n--------'
			+ '\n-> paymentdate: ' + paymentdate
			+ '\n-> amount: ' + amount
			);
		// TODO: Set up call to Backend for PDF generation + download
	}
	
	render() {
		var tickets = this.props.tickets.map(function(obj) {
			return {date: obj.date,
					type: obj.type,
					priority: obj.priority,
					title: obj.title,
					description: obj.description,
					status: obj.status,
				}
		});

		return (

			<div className='popup'>  
				<div className='popup-panel'>
					<div class="makeapayment-container">
						<div class="popup-header">
							<h3 class="popup-header-title">My Statements</h3>
							<Button variant="outlined"
								onClick={this.props.closePopup}>
									Close
							</Button>  
						</div>
						<br /><br />
						<div class="tickets">
							{tickets.map((data) =>
								<div class="tickets-item">
									<div class = "tickets-item-date">{data.date}</div>
									<div class = "tickets-item-title">{data.title}</div>
									<div class = "tickets-item-status">{data.status}</div>
									{/* TODO: Set up connection to download PDF of statement */}
									<div class = "tickets-item-button">
										<button 
											class="secondary-button"
											onClick={this.togglePopupTicket.bind(this, data)}>
											View Ticket
										</button>
										{this.state.showTicket ?  
											<Ticket
													ticket={this.state.ticketInfo}
													closePopup={this.togglePopupTicket.bind(this, {})}  
											/>  
											: null  
										}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>  
			</div>  
		);  
  }

  togglePopupTicket(ticket) {
	this.setState({showTicket : !this.state.showTicket});
	this.setState({ticketInfo : ticket});
}
}

class Ticket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	  }
	
	  handleSubmit(event) {
		if(this.state.type === '' || this.state.priority === '' ||
			this.state.title === '' || this.state.description === '')
		{
			alert('WARNING: Incomplete Ticket.\n\nPlease ensure all information is provided.');
			return;
		}

		//TODO: Backend operation on successful ticket placement

		alert('type: ' + this.state.type
			  + '\npriority: ' + this.state.priority
			  + '\ntitle: ' + this.state.title
			  + '\ndescription: ' + this.state.description
			)
		alert('Request ticket successfully placed!');
		this.props.closePopup()
		event.preventDefault();
	  }
	
	render() {
		var ticket = this.props.ticket;

		return (  
			<div className='popup'>  
				<div className='popup-panel'>
					<div class="makeapayment-container">
						<div class="popup-header">
							<h3 class="popup-header-title">Service Request Ticket</h3>
							<Button variant="outlined"
								onClick={this.props.closePopup}>
									Close
							</Button>  
						</div>
						<div class="rate-container">

						</div>
						<form class="rate-container" onSubmit={this.handleSubmit}>
							<h4>Request Type</h4>
							<FormControl required style={{width: '100%', marginBottom: 10}}>
								<TextField
										disabled
										label="Type"
										name="type"
										variant="outlined"
										value={ticket.type} />
							</FormControl>
							<FormControl required style={{width: '100%', marginBottom: 10}}>
								<TextField
										disabled
										label="Priority"
										name="priority"
										variant="outlined"
										value={ticket.priority} />
							</FormControl>
							<h4>Request Information</h4>
							<FormControl required style={{width: '100%', marginBottom: 10}}>
								<TextField
										disabled
										label="Title"
										name="title"
										variant="outlined"
										fullWidth='true'
										value={ticket.title}
										onChange={this.handleInputChange} />
							</FormControl>
							<FormControl required style={{width: '100%', marginBottom: 10}}>
								<TextField
										disabled
										label="Ticket Description"
										name="description"
										variant="outlined"
										multiline
										rows="4"
										fullWidth='true'
										value={ticket.description}
										onChange={this.handleInputChange} />
							</FormControl>
							<div style={{width: '100%'}}>
								<br />
							</div>
							<h4>Request Charges</h4>
							<div style={{width: '100%', marginBottom: 30}}>
								<i>NOTE: Service Requests incur an hourly labor rate ($25/hr) based on hours worked.</i>
							</div>
						</form>
					</div>
				</div>  
			</div>  
		);  
  }
}

export default ResidentPortal;