import React, { Component } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinnerComponent/LoadingSpinner";
import { ERRORS } from "../ConstantsComponent/errorConstants";

export default class Form extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    sent: false,
    isLoading: false,
    errorMessage: "",
    formErrors: { firstname: "", lastname: "", email: "", description: "" },
    formValid: false,
    firstNameValid: false,
    lastNameValid: false,
    emailValid: false,
    descriptionValid: false,
    image: "",
    isImageUploaded: false,
  };
  // handle input
  handleFirstName = (e) => {
    this.setState(
      {
        firstname: e.target.value,
      },
      () => {
        this.validateField("firstname", this.state.firstname);
      }
    );
  };
  handleLastName = (e) => {
    this.setState(
      {
        lastname: e.target.value,
      },
      () => {
        this.validateField("lastname", this.state.lastname);
      }
    );
  };

  handleEmail = (e) => {
    this.setState(
      {
        email: e.target.value,
      },
      () => {
        this.validateField("email", this.state.email);
      }
    );
  };
  handleDescription = (e) => {
    this.setState(
      {
        description: e.target.value,
      },
      () => {
        this.validateField("description", this.state.description);
      }
    );
  };
  //end of handle input
  //Start of validate inputs
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    console.log("-- first name value----", value);
    console.log("-- field name---", fieldName);
    switch (fieldName) {
      case "firstname":
        this.setState(
          {
            firstNameValid: value,
          },
          () => {
            console.log("-- first name----", this.state.firstNameValid);
            fieldValidationErrors.firstname = this.state.firstNameValid
              ? ""
              : ERRORS.ERROR_FIRSTNAME;
            console.log("-- fieldValidationErrors----", fieldValidationErrors);
          }
        );
        break;
      case "lastname":
        this.setState(
          {
            lastNameValid: value,
          },
          () => {
            console.log("-- last name----", this.state.lastNameValid);
            fieldValidationErrors.lastname = this.state.lastNameValid
              ? ""
              : ERRORS.ERROR_LASTNAME;
            console.log("-- fieldValidationErrors----", fieldValidationErrors);
          }
        );
        break;
      case "email":
        this.setState(
          {
            emailValid: value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
          },
          () => {
            console.log("-- email----", this.state.emailValid);
            fieldValidationErrors.email = this.state.emailValid
              ? ""
              : ERRORS.ERROR_EMAIL;
            console.log("-- fieldValidationErrors----", fieldValidationErrors);
          }
        );
        break;
      case "description":
        this.setState(
          {
            descriptionValid: value,
          },
          () => {
            console.log("-- description----", this.state.descriptionValid);
            fieldValidationErrors.description = this.state.descriptionValid
              ? ""
              : ERRORS.ERROR_DESCRIPTION;
            console.log("-- fieldValidationErrors----", fieldValidationErrors);
          }
        );
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.emailValid &&
        this.state.description,
    });
  }
  //end of validate inputs

  //start of form submit

  formSubmit = (e) => {
    console.log("-- inside");
    e.preventDefault();
    this.setState({
      isLoading: true,
    });

    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      description: this.state.description,
    };
    console.log(data);
    axios
      .post("/api/form", data)
      .then((res) => {
        console.log(res);
        this.setState(
          {
            sent: true,
            isLoading: false,
          },
          this.resetForm()
        );
      })
      .catch(() => {
        this.setState({
          errorMessage:
            "Sorry, we are facing some technical issues, please try after sometime.",
          isLoading: false,
        });
        console.log("form not submitted");
      });
  };
  //end of form submit

  //for resetting initial dat
  resetForm = () => {
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      description: "",
      image: "",
      isImageUploaded: false,
      errorMessage: "",
         });

    setTimeout(() => {
      this.setState({
        sent: false,
      });
    }, 3000);
  };

  handleImageUpload = (e) => {
    const reader = new FileReader();
    console.log("-- reader--", reader);
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ image: reader.result, isImageUploaded: true });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.formSubmit}>
          {/*single Item */}
          <div className="singleItem">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              className="firstname"
              placeholder="your name .."
              value={this.state.firstname}
              onChange={this.handleFirstName}
              required
            />
            <div className="error">{this.state.formErrors["firstname"]}</div>
          </div>
          {/*End of single item*/}
          {/*single Item */}
          <div className="singleItem">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="lastname"
              placeholder="your last name .."
              value={this.state.lastname}
              onChange={this.handleLastName}
              required
            />
            <div className="error">{this.state.formErrors["lastname"]}</div>
          </div>
          {/*End of single item*/}
          {/*single Item */}
          <div className="singleItem">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="email"
              placeholder="your email .."
              value={this.state.email}
              onChange={this.handleEmail}
              required
            />
            <div className="error">{this.state.formErrors["email"]}</div>
          </div>
          {/*End of single item*/}
          {/*single Item */}
          <div className="textArea singleItem">
            <label htmlFor="description">Description</label>
            <textarea
              name="Description"
              id=""
              rows="5"
              cols="30"
              placeholder="Enter Description..."
              value={this.state.description}
              onChange={this.handleDescription}
              required
            ></textarea>
            <div className="error">{this.state.formErrors["description"]}</div>
          </div>
          {/*End of single item*/}
          {/*single Item */}
          <div className="singleItem">
            <label htmlFor="imageUpload">Upload Image</label>
            <input
              type="file"
              name="image-upload"
              className="image"
              onChange={this.handleImageUpload}
              accept="image/*"
            />
          </div>
          {/*End of single item*/}
          {/*single Item */}
          {this.state.isImageUploaded && (
            <div className="singleItem imageHolder">
              <img src={this.state.image} alt="" id="img" className="img" />
            </div>
          )}
          {/*End of single item*/}
          {this.state.isLoading ? <LoadingSpinner /> : null}
          <div className={this.state.sent ? "msg msgAppear" : "msg"}>
            Form has been submitted
          </div>
          {this.state.errorMessage && (
            <div className="error">{this.state.errorMessage}</div>
          )}
          <div className="btn">
            <button
              type="submit"
              disabled={this.state.isLoading || !this.state.formValid}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
