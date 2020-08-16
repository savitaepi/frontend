import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTodaysDateInYMD } from "../../utils";

export const SMIDDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Application for SMID program",
      labelKey: "NULM_APPLICATION_FOR_SMID_PROGRAM"

    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  SMIDDetailsContainer: getCommonContainer({
   
    caste: {
      ...getTextField({
        label: {
          labelName: "Caste of Applicant",
          labelKey: "NULM_SMID_CASTE_OF_APPLICANT",
        },
        placeholder: {
          labelName: "Enter Caste of Applicant",
          labelKey: "NULM_SMID_CASTE_OF_APPLICANT_PLACEHOLDER",
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "NULMSEPRequest.name",       
      })
    },

    isUrbanPoor: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "NULMSEPRequest.isUrbanPoor",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Urban Poor", key: "NULM_SMID_URBAN_POOR" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SMID_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SMID_NO",
            value:"NO",           
          },        
        ],      
        defaultValue: "NO"
      },
      type: "array",     
    },

    bplNo: {
      ...getTextField({
        label: {
          labelName: "BPL NULM_SMID_BPL_NUMBER",
          labelKey: "NULM_SMID_BPL_NUMBER"
        },
        placeholder: {
          labelName: "Enter NULM_SMID_BPL_NUMBER",
          labelKey: "NULM_SMID_BPL_NUMBER_PLACEHOLDER"
        },
        required: false,
        pattern: getPattern("alpha-numeric") || null,
        jsonPath: "NULMSEPRequest.bplNo"
      })
    },

    pwd: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "NULMSEPRequest.isUrbanPoor",
      type: "array",
      props: {
        required: true,
       
        label: { name: "PWD", key: "NULM_SMID_PWD" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SMID_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SMID_NO",
            value:"NO",           
          },        
        ],      
        defaultValue: "NO"
      },
      type: "array",     
    },

    nameofApplicant: {
      ...getTextField({
        label: {
          labelName: "Name of Applicant",
          labelKey: "NULM_SMID_NAME_OF_APPLICANT",
        },
        placeholder: {
          labelName: "Enter Name of Applicant",
          labelKey: "NULM_SMID_NAME_OF_APPLICANT_PLACEHOLDER",
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "NULMSEPRequest.name",       
      })
    },

    qualification: {
      ...getSelectField({
        label: {
          labelName: "Select Qualification",
          labelKey: "NULM_SMID_QUALIFACATION"
        },
        placeholder: {
          labelName: "Select Qualification",
          labelKey: "NULM_SMID_QUALIFACATION_SELECT"
        },
        required: false,
        pattern: getPattern("alpha-numeric-with-space") || null,
        jsonPath: "NULMSEPRequest.qualification",
        
        sourceJsonPath:
        "applyScreenMdmsData.pension.employeeGroup",

        props: {
          optionValue: "code",
          optionLabel: "name",
        },

      })


    },

    fatherSpoucename: {
      ...getTextField({
        label: {
          labelName: "Father/Spouse Name",
          labelKey: "NULM_SMID_FATHER/SPOUSE_NAME"
        },
        placeholder: {
          labelName: "Enter Father/Spouse Name",
          labelKey: "NULM_SMID_FATHER/SPOUSE_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "NULMSEPRequest.fatherOrHusbandName"
      })
    },

    dateofbirth: {
      ...getDateField({
        label: {
          labelName: "Date Of Birth",
          labelKey: "NULM_SMID_DOB"
        },
        placeholder: {
          labelName: "Enter Date Of Birth",
          labelKey: "NULM_SMID_DOB_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Date") || null,
        jsonPath: "NULMSEPRequest.dob",
        props: {
          inputProps: {
            max: getTodaysDateInYMD()
          }
        }
      })
    },

   emailId: {
      ...getDateField({
        label: {
          labelName: "Email Id",
          labelKey: "NULM_SMID_EMAIL_ID"
        },
        placeholder: {
          labelName: "Enter Email Id",
          labelKey: "NULM_SMID_EMAIL_ID_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Date") || null,
        jsonPath: "NULMSEPRequest.dob",
        props: {
          inputProps: {
            max: getTodaysDateInYMD()
          }
        }
      })
    },
    mobilenumber: {
      ...getTextField({
        label: {
          labelName: "Mobile Number",
          labelKey: "NULM_SMID_MOBILE_NUMBER"
        },
        placeholder: {
          labelName: "Enter Mobile Number",
          labelKey: "NULM_SMID_MOBILE_NUMBER_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("MobileNo") || null,
        jsonPath: "NULMSEPRequest.contact"
      })
    },

    phonenumber: {
      ...getTextField({
        label: {
          labelName: "Phone Number",
          labelKey: "NULM_SMID_PHONE_NUMBER"
        },
        placeholder: {
          labelName: "Enter Phone Number",
          labelKey: "NULM_SMID_PHONE_NUMBER_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("MobileNo") || null,
        jsonPath: "NULMSEPRequest.contact"
      })
    },
      
    mothername: {
      ...getTextField({
        label: {
          labelName: "Mother Name",
          labelKey: "NULM_SMID_MOTHER_NAME"
        },
        placeholder: {
          labelName: "Enter Mother Name",
          labelKey: "NULM_SMID_MOTHER_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "NULMSEPRequest.motherName"
      })
    },
    address: {
      ...getTextField({
        label: {
          labelName: "Addrss",
          labelKey: "NULM_SMID_ADDRESS"
        },
        placeholder: {
          labelName: "Enter Addrss",
          labelKey: "NULM_SMID_ADDRESS_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Address") || null,
        jsonPath: "NULMSEPRequest.address"
      })
    },
    
    gender: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "NULMSEPRequest.gender",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Gender", key: "NULM_SMID_GENDER" },
        buttons: [
          {
            labelName: "FEMALE",
            labelKey: "NULM_SMID_GENDER_FEMALE",
            value:"FEMALE",           
          },
          {
            label: "MALE",
            labelKey: "NULM_SMID_GENDER_MALE",
            value:"MALE",           
          },
          {
            label: "OTHERS",
            labelKey: "NULM_SMID_GENDER_OTHERS",
            value:"OTHERS",           
          }
        ],      
        defaultValue: "MALE"
      },
      type: "array",
     
    },
    isMinority: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "NULMSEPRequest.isMinority",
      type: "array",
      props: {
        required: true,
        label: { name: "Minority", key: "NULM_SMID_MINORITY" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SMID_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SMID_NO",
            value:"NO",           
          },        
        ],      
        defaultValue: "NO"
      },
      type: "array",     
    },

    minority: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "NULMSEPRequest.minority",
      type: "array",
      props: {
        required: false,
       
        label: { name: "Minority Religion", key: "NULM_SMID_MINORITY_RELIGION" },
        buttons: [
          {
            labelName: "MUSLIM",
            labelKey: "NULM_SMID_MUSLIM",
            value:"MUSLIM",           
          },
          {
            label: "SIKH",
            labelKey: "NULM_SMID_SIKH",
            value:"SIKH",           
          },
          {
            label: "CHRISTIAN",
            labelKey: "NULM_SMID_CHRISTIAN",
            value:"CHRISTIAN",           
          },
          {
            label: "JAIN",
            labelKey: "NULM_SMID_JAIN",
            value:"JAIN",           
          },
          {
            label: "BUDDHIST",
            labelKey: "NULM_SMID_BUDDHIST",
            value:"BUDDHIST",           
          },
          {
            label: "PARSIS",
            labelKey: "NULM_SMID_PARSIS",
            value:"PARSIS",           
          }
        ],
      
        defaultValue: "MUSLIM"
      },
      type: "array",     
    },
    wardno: {
      ...getTextField({
        label: {
          labelName: "Ward No",
          labelKey: "NULM_SMID_WARD_NO"
        },
        placeholder: {
          labelName: "Enter Ward No",
          labelKey: "NULM_SMID_WARD_NO_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name") || null,
        jsonPath: "NULMSEPRequest.motherName"
      })
    },
    adharNo: {
      ...getTextField({
        label: {
          labelName: "Adhar Number",
          labelKey: "NULM_SMID_ADHAR_NUMBER"
        },
        placeholder: {
          labelName: "Enter Adhar Number",
          labelKey: "NULM_SMID_ADHAR_NUMBER_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("numeric-only") || null,
        jsonPath: "NULMSEPRequest.adharNo"
      })
    },
    nameasperadharNo: {
      ...getTextField({
        label: {
          labelName: "Name as per Adhar",
          labelKey: "NULM_SMID_NAME_AS_PER_ADHAR"
        },
        placeholder: {
          labelName: "Enter Name as per Adhar",
          labelKey: "NULM_SMID_NAME_AS_PER_ADHAR_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("numeric-only") || null,
        jsonPath: "NULMSEPRequest.adharNo"
      })
    },

    acknowledgementNo: {
      ...getTextField({
        label: {
          labelName: "Adhar Acknowledgement Number",
          labelKey: "NULM_SMID_ADHAR_ACKNOWLEDGEMENT_NUMBER"
        },
        placeholder: {
          labelName: "Enter Adhar Acknowledgement Number",
          labelKey: "NULM_SMID_ADHAR_ACKNOWLEDGEMENT_NUMBER_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("numeric-only") || null,
        jsonPath: "NULMSEPRequest.adharNo"
      })
    },
      
    insurance: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "NULMSEPRequest.gender",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Insurance", key: "NULM_SMID_INSURANCE" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SMID_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SMID_NO",
            value:"NO",           
          },
         
        ],      
        defaultValue: "YES"
      },
      type: "array",
     
    },
    insuranceThrough: {
      ...getTextField({
        label: {
          labelName: "Insurance through",
          labelKey: "NULM_SMID_INSURANCE_THROUGH"
        },
        placeholder: {
          labelName: "Enter Insurance through",
          labelKey: "NULM_SMID_INSURANCE_THROUGH_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("numeric-only") || null,
        jsonPath: "NULMSEPRequest.adharNo"
      })
    },

    streetVendor: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "NULMSEPRequest.gender",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Street vendor", key: "NULM_SMID_STREET_VENDOR" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SMID_STREET_VENDOR_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SMID_STREET_VENDOR_NO",
            value:"NO",           
          },
         
        ],      
        defaultValue: "YES"
      },
      type: "array",
     
    },
    homeless: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 6
      },
      jsonPath: "NULMSEPRequest.gender",
      type: "array",
      props: {
        required: true,
       
        label: { name: "Homeless", key: "NULM_SMID_HOMELESS" },
        buttons: [
          {
            labelName: "YES",
            labelKey: "NULM_SMID_HOMELESS_YES",
            value:"YES",           
          },
          {
            label: "NO",
            labelKey: "NULM_SMID_HOMELESS_NO",
            value:"NO",           
          },
         
        ],      
        defaultValue: "YES"
      },
      type: "array",
     
    },
  

  })
});