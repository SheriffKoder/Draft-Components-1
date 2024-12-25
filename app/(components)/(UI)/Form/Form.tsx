"use client"

import React, { useState } from "react"
import { ChangeEventHandler, FormEventHandler } from "react";
// import ImageSlider from "./slider2"
import { redirect } from "next/navigation";

import "./Form.css"

interface EmailBody {
  firstname: string;
  lastname: string;
  birth: string;
  phone: string;
  email: string;
  gender: string; // male, female

  address_Line1: string;
  address_Line2: string;
  city: string;
  state: string;
  code: string; // zip code number
  languages: string[]; // array of strings

  emergency_firstname: string;
  emergency_lastname: string;
  emergency_phone: string;

  secondJob: string; // yes/no/other
  experience: string; // yes/no
  position: string[]; // array of desired positions
  desired_days: string[];
  experience_field: string;
  documents: string; // yes/no
  drive: string; // yes/no
  referral: string[]; // array of referral platforms
  referral_name: string;
}

const Form = () => {

const [busy, setBusy] = useState(false);


 ////////////////////////////////////////////////////////////////////////////////////
 const [emailBody, setEmailBody] = useState<EmailBody>({
  firstname: "",
  lastname: "",
  birth : "",
  phone: "",
  email: "",
  gender: "",                // male, female

  address_Line1: "",
  address_Line2: "",
  city: "",
  state: "",
  code: "",                 // zip code number
  languages: [],            // array or strings

  emergency_firstname: "",
  emergency_lastname: "",
  emergency_phone: "",

  secondJob: "",            // string yes/no/other
  experience: "",           // string yes/no       
  position: [],             // array of desired positions
  desired_days: [],
  experience_field : "",
  documents: "",            // string yes/no
  drive: "",                // string yes/no
  referral: [],             // array of referral platforms
  referral_name: "",

  });

  const { firstname, lastname , birth, phone, email, gender,
    address_Line1, address_Line2, city, state, code, languages,
    emergency_firstname, emergency_lastname, emergency_phone,
    secondJob, experience, position, experience_field, documents, drive, referral, referral_name} = emailBody;

  // const messageContainer_inquiry = useRef<HTMLDivElement>(null)

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement > = ({ target }) => {

      const { name, value } = target;
      setEmailBody({ ...emailBody, [name]:value});
      console.log(emailBody);

    }

    /////////////////////////////////////////////////////////////////////////////
    // checkbox functionality
    const handleCheckboxChange = (e:any) => {
      const { name, value, checked } = e.target; // Get name, value, and checked from the checkbox
      setEmailBody((prevState:any) => {
        const updatedArray = checked
          ? [...prevState[name], value] // Add to the array if checked
          : prevState[name].filter((item:any) => item !== value); // Remove from the array if unchecked

        return {
          ...prevState,
          [name]: updatedArray, // Dynamically update the array based on the name
        };
      });
      console.log(emailBody);
    };

    /////////////////////////////////////////////////////////////////////////////
    // language functionality
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {

        // Prevent form submission on Enter
        if (e.key === 'Enter') {
            e.preventDefault();
            return;
        }
    
      if (e.key === " " && inputValue.trim() !== "") {
        // Add the word to the languages array
        setEmailBody((prevState) => ({
          ...prevState,
          languages: [...prevState.languages, inputValue.trim()],
        }));
        setInputValue(""); // Clear the input field
      }
    };

    const handleRemoveLanguage = (language: string): void => {
      setEmailBody((prevState) => ({
        ...prevState,
        languages: prevState.languages.filter((lang) => lang !== language),
      }));
    };

    


    /////////////////////////////////////////////////////////////////////////////
    //handle the inquiry submission
    const handleSubmit: FormEventHandler<HTMLFormElement>  = async (data) => {
        data.preventDefault();
        // console.log(emailBody);

        try {
            console.log(data);
            setBusy(true);
            const res = await fetch("/api/mail", {
              method: "POST",
              body: JSON.stringify(data),
            })
      
            if (res.ok) {
              let modal = document.querySelector<HTMLElement>("#formModal")
              if (modal) {
                modal.style.display = "flex"
                setTimeout(() => {
                  modal.style.display = "none"
                  setBusy(false);
                  redirect("/")
                }, 5000)
              }
            }
          } catch (error) {
            console.error("Error submitting form:", error)
          }
    
      }
    
  return (
    <form className="px-[1rem] flex flex-col gap-[3rem] mx-auto relative max-w-[1200px]" onSubmit={handleSubmit}
    id="join_form">


      {/* small view port header */}
      {/* <div className="px-[1rem] mb-[-1rem] vp4:hidden">
        <h1 className="heading1">Join our team</h1>
        <p className="f_rale text-[min(calc(0.75rem+2.5vw),44px)] ">Let us make a difference</p>
      </div> */}

      <div className="flex flex-col vp5:flex-row gap-[3rem] w-full">
        
        {/* larger view port header and image slider */}
        <div className="border border-black vp5:flex-1 vp5:order-2 h-[40vw] vp5:h-[85vh] vp5:sticky vp5:top-[12%]
        flex flex-col accent2-bg text-white rounded-[10px] overflow-hidden relative
        w-[550px] vp5:max-w-auto w-full mx-auto max-h-[272px] vp5:max-h-max
        ">
          <div className="absolute px-[2rem] pt-[1rem] z-[1] w-full h-full"
           style={{
            background: "linear-gradient(160deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 21%, rgba(255,255,255,0) 100%)"
          }}>
            <h1 className="heading2">Join our team</h1>
            <p className="f_rale text-[min(calc(0.75rem+2vw),35px) vp5:text-[min(calc(0.75rem+1vw),35px)] ">Let us make a difference</p>
          </div>

            {/* <ImageSlider images={images}/> */}
        </div>

        {/* form sections */}
        <div className="flex flex-col gap-[3rem] mx-auto order-1 mt-[-1rem] vp5:mt-0">
          <div className="form_section">
            <h2 className="FormLabel">Personal Information</h2>
            {/* //////////////////////////////////////////////////////////////////////////////////// */}
            {/* name */}
            <div className="form_area">

              <label className="FormLabel" htmlFor="firstname">
                Name
              </label>

              <div className="form_row">
                <input
                className="FormInput2"
                id="firstname"
                maxLength={35}
                name="firstname"
                value={firstname}
                onChange={handleChange}
                 
                type="text"
                placeholder="First Name"
                />

                <input
                className="FormInput2"
                id="lastname"
                maxLength={35}
                name="lastname"
                value={lastname}
                onChange={handleChange}
                 
                type="text"
                placeholder="Last Name"
                />
              </div>

            </div>

            {/* date of birth */}
            <div className="form_area">
              <label className="FormLabel" htmlFor="birth">
                Date of Birth
              </label>

              <input
                className="FormInput"
                id="birth"
                name="birth"
                value={birth}
                onChange={handleChange}
                 
                type="date" 
                />

            </div>

            {/* phone */}
            <div className="form_area">
            <label className="FormLabel" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="FormInput"
              id="phone"
              maxLength={35}
              name="phone"
              value={phone}
              onChange={handleChange}
               
              type="text"
              placeholder="+00123456789"/>
            </div>

            {/* email */}
            <div className="form_area">
              <label className="FormLabel" htmlFor="email">
                Email
              </label>
              <input
                className="FormInput"
                id="email"
                maxLength={35}
                name="email"
                value={email}
                onChange={handleChange}
                 
                type="email" 
                placeholder="youremail@email.com"
                />
            </div>        

          {/* gender */}
          <fieldset className="form_radio_row">
            <legend className="FormLabel w-full">Gender</legend>
            <input type="radio" name="gender" id="male_radio" value="male" onChange={handleChange}/><label htmlFor="male_radio">Male</label><br />
            <input type="radio" name="gender" id="female_radio" value="female"  onChange={handleChange}/><label htmlFor="female_radio">Female</label>
          </fieldset>

          {/* Languages */}
          <div className="form_area">
            <label className="FormLabel" htmlFor="languages">
              Languages fluently spoken in addition to English
            </label>
            <input
            className="FormInput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a language and press space"
            />
            <div className="mt-[10px] flex flex-row gap-[1rem] flex-wrap">
              {emailBody.languages.map((language, index) => (
                <span
                  key={index}
                  className="relative inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-md"

                >
                  {language}
                  <button
                    onClick={() => handleRemoveLanguage(language)}
                    className="absolute top-[-7px] right-[-7px] accent2-bg
                    text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////// */}

          </div>

          {/* //////////////////////////////////////////////////////////////////////////////////// */}
          {/* address */}
          <div className="form_section">
            
            <h2 className="FormLabel">Address</h2>

            <div className="form_area">
            {/* Line 1 */}
            <label className="FormLabel2" htmlFor="address_Line1">
              Street Address
            </label>
            <input
              className="FormInput"
              id="Address_Line1"
              maxLength={35}
              name="address_Line1"
              value={address_Line1}
              onChange={handleChange}
               
              type="text" 
              placeholder=""
            />

            </div>

            <div className="form_area">
            {/* Line 2 */}
            <label className="FormLabel2" htmlFor="address_Line2">
              Street Address Line 2
            </label>
            <input
            className="FormInput"
            id="Address_Line2"
            maxLength={35}
            name="address_Line2"
            value={address_Line2}
            onChange={handleChange}
             
            type="text" 
            placeholder=""
            />

            </div>

            {/* City , State */}
            <div className="form_area_x3">

              <div className="form_area">
              <label className="FormLabel2" htmlFor="city">
                    City
                  </label>
                <input
                  className="FormInput"
                  id="city"
                  maxLength={35}
                  name="city"
                  value={city}
                  onChange={handleChange}
                   
                  type="text"
                  placeholder=""
                  />

              </div>
            
              <div className="form_area">
              <label className="FormLabel2" htmlFor="state">
                  State
                </label>
                <input
                  className="FormInput"
                  id="state"
                  maxLength={35}
                  name="state"
                  value={state}
                  onChange={handleChange}
                   
                  type="text"
                  placeholder=""
                  />

              </div>

              <div className="form_area">
              <label className="FormLabel2" htmlFor="code">
                  Zip code
                </label>
                <input
                  className="FormInput"
                  id="code"
                  maxLength={35}
                  name="code"
                  value={code}
                  onChange={handleChange}
                   
                  type="text"
                  placeholder=""
                  />

              </div>
            </div>
          </div>



          {/* //////////////////////////////////////////////////////////////////////////////////// */}
          <div className="form_section">
            <h2 className="FormLabel">Your Preferences</h2>

            {/* position */}
            <div className="form_area">
              <h3 className="FormLabel w-full">What position are you applying for?</h3>
              
              <div className="flex flex-col gap-2">

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="position" id="pos_ban_server" value="Banquet Server" /><label htmlFor="pos_ban_server">Banquet Server</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="position" id="pos_bar" value="Bartender"  /><label htmlFor="pos_bar">Bartender</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="position" id="pos_kit" value="Kitchen Helper"  /><label htmlFor="pos_kit">Kitchen Helper</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="position" id="pos_ban_captain" value="Banquet Captain"  /><label htmlFor="pos_ban_captain">Banquet Captain</label>
                </div>

              </div>
            </div>

            {/* availability */}
            <div className="form_area">
              <h3 className="FormLabel w-full">What days and times are you available to work?</h3>
              
              <div className="flex flex-col gap-2">

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="desired_days" id="av_mon" value="Monday" /><label htmlFor="av_mon">Monday</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="desired_days" id="av_tues" value="Tuesday"  /><label htmlFor="av_tues">Tuesday</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="desired_days" id="av_wed" value="Wednesday"  /><label htmlFor="av_wed">Wednesday</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="desired_days" id="av_thurs" value="Thursday"  /><label htmlFor="av_thurs">Thursday</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="desired_days" id="av_fri" value="Friday"  /><label htmlFor="av_fri">Friday</label>
                </div>
          
                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="desired_days" id="av_sat" value="Saturday"  /><label htmlFor="av_sat">Saturday</label>
                </div>

                <div className="flex flex-row gap-2">
                  <input onChange={handleCheckboxChange}
                  type="checkbox" name="desired_days" id="av_sun" value="Sunday"  /><label htmlFor="av_sun">Sunday</label>
                </div>

              </div>
            </div>
          </div>



          <div className="form_section">
            <h2 className="FormLabel">More about you</h2>

            {/* Emergency person */}
            <div className="form_area">

              <label className="FormLabel" htmlFor="emergency_firstname">
                Emergency Contact person
              </label>

              <div className="form_row">
                <input
                  className="FormInput2"
                  id="emergency_firstname"
                  maxLength={35}
                  name="emergency_firstname"
                  value={emergency_firstname}
                  onChange={handleChange}
                   
                  type="text"
                  placeholder="First Name"
                  />

                <input
                  className="FormInput2"
                  id="emergency_lastname"
                  maxLength={35}
                  name="emergency_lastname"
                  value={emergency_lastname}
                  onChange={handleChange}
                   
                  type="text"
                  placeholder="Last Name"
                  />

              </div>

              {/* Emergency phone */}
              <div className="flex flex-col gap-2 ">
                <label className="FormLabel" htmlFor="emergency_phone">
                Emergency Phone Number
                </label>
                <input
                  className="FormInput"
                  id="emergency_phone"
                  maxLength={35}
                  name="emergency_phone"
                  value={emergency_phone}
                  onChange={handleChange}
                   
                  type="text"
                  placeholder="+00123456789"/>
              </div>
            </div>

            {/* //////////////////////////////////////////////////////////////////////////////////// */}
            {/* secondJob */}

            <div className="form_area">
              <fieldset className="">
                <legend className="FormLabel w-full">Do you have a second job or other commitments that would interfer while working with Way To Go?</legend>
                <div className="form_radio_row">
                  <div className="flex flex-row gap-2">
                    <input onChange={handleChange}
                    type="radio" name="secondJob" id="secondJob_yes" value="yes" /><label htmlFor="secondJob_yes">Yes</label>
                  </div>

                  <div className="flex flex-row gap-2">
                    <input onChange={handleChange}
                    type="radio" name="secondJob" id="secondJob_no" value="no"  /><label htmlFor="secondJob_no">No</label>
                  </div>

                  <div className="flex flex-row gap-2">
                    <input onChange={handleChange}
                    type="radio" name="secondJob" id="secondJob_other" value="other"  /><label htmlFor="secondJob_other">Other</label>
                  </div>

                </div>
              </fieldset>


              {/* experience */}
              <fieldset className="flex flex-row gap-2 flex-wrap">
                <legend className="FormLabel w-full">Do you have any experience in catering or serving?</legend>
                <div className="form_radio_row">
                  <div className="flex flex-row gap-2">
                    <input onChange={handleChange}
                    type="radio" name="experience" id="experience_yes" value="yes" /><label htmlFor="experience_yes">Yes</label>
                  </div>

                  <div className="flex flex-row gap-2">
                    <input onChange={handleChange}
                    type="radio" name="experience" id="experience_no" value="no"  /><label htmlFor="experience_no">No</label>
                  </div>
                </div>
              </fieldset>

              {/* exp field */}
              <div className="flex flex-col gap-2 flex-wrap">
                <label className="FormLabel" htmlFor="experience_field">
                  If yes, please write a few sentences about your recent job experiences.
                </label>

                  <textarea
                  className="border-0 FormInput h-full min-w-full py-2 resize-none"
                  name="experience_field"
                  value={experience_field}
                  onChange={handleChange}
                   
                  id="experience_field"
                  cols={3}
                  rows={5}
                  placeholder="describe your inquiry"
                  >

                  </textarea>

              </div>
            </div>


          </div>


          <div className="form_section">
            {/* //////////////////////////////////////////////////////////////////////////////////// */}
            {/* other questions */}
            <h2 className="FormLabel">More Information</h2>

            {/* documents */}
              <fieldset className="form_area">
                <legend className="FormLabel w-full">Would you be able to provide legal work documents if chosen for hire? (SSN, ITIN#, etc)</legend>

                <div className="flex flex-row gap-2">
                  <input type="radio" name="documents" id="documents_yes" value="yes" onChange={handleChange}/><label htmlFor="documents_yes">Yes</label>
                </div>

                <div className="flex flex-row gap-2">
                <input type="radio" name="documents" id="documents_no" value="no"  onChange={handleChange}/><label htmlFor="documents_no">No</label>
                </div>

              </fieldset>

              {/* drive */}
              <fieldset className="form_area">
                <legend className="FormLabel w-full">Would you be willing to drive other co-workers to and from the venues?</legend>

                <div className="flex flex-row gap-2">
                  <input type="radio" name="drive" id="drive_yes" value="yes" onChange={handleChange}/><label htmlFor="drive_yes">Yes</label>
                </div>

                <div className="flex flex-row gap-2">
                <input type="radio" name="drive" id="drive_no" value="no"  onChange={handleChange}/><label htmlFor="drive_no">No</label>
                </div>

              </fieldset>

              {/* referral */}
              <div className="form_area">
                <h3 className="FormLabel w-full">How did you hear about us? Were you referred by someone who works here?</h3>
                
                <div className="flex flex-col gap-2">

                  <div className="flex flex-row gap-2">
                    <input onChange={handleCheckboxChange}
                    type="checkbox" name="referral" id="ref_sm" value="social media" /><label htmlFor="ref_sm">Social Media</label>
                  </div>

                  <div className="flex flex-row gap-2">
                    <input onChange={handleCheckboxChange}
                    type="checkbox" name="referral" id="ref_in" value="indeed"  /><label htmlFor="ref_in">Indeed</label>
                  </div>

                  <div className="flex flex-row gap-2">
                    <input onChange={handleCheckboxChange}
                    type="checkbox" name="referral" id="ref_web" value="website/online search"  /><label htmlFor="ref_web">Website/Online Search</label>
                  </div>

                  <div className="flex flex-row gap-2">
                    <input onChange={handleCheckboxChange}
                    type="checkbox" name="referral" id="ref_walk" value="walk-in"  /><label htmlFor="ref_walk">Walk-in</label>
                  </div>

                  <div className="flex flex-row gap-2">
                    <input onChange={handleCheckboxChange}
                    type="checkbox" name="referral" id="ref_ref" value="referrals"  /><label htmlFor="ref_ref">Referrals</label>
                  </div>
            

                </div>
              </div>

              {/* phone */}
              <div className="form_area">
                
                <label className="FormLabel" htmlFor="referral_name">
                  If Referred by someone, Write their name below
                </label>
                <input
                  className="FormInput"
                  id="referral_name"
                  maxLength={35}
                  name="referral_name"
                  value={referral_name}
                  onChange={handleChange}
                   
                  type="text"
                  placeholder=""/>
              </div>
            </div>


            <button type="submit" className={`${busy ? 'grayscale pointer-events-none' : ''}`} disabled={busy}>
            
            { busy ? 
            (
              <div className="MrazloaderContainer">
              <div className="Mrazloader-2"></div>
          </div>
            ): (
              "Submit"
            )}
          </button>
        </div>
    

      </div>


    </form>
  )
}

export default Form
