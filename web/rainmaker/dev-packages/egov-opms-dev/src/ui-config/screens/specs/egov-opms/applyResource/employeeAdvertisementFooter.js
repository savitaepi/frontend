import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { applyTradeLicense } from "../../../../../ui-utils/commons";
import {
  getButtonVisibility,
  getCommonApplyFooter,
  showHideAdhocPopupopms,
  showHideAdhocPopupopmsReject,
  showHideAdhocPopupopmsReassign,
  showHideAdhocPopupopmsApprove,
  showHideAdhocPopupopmsForward,
  showHideAdhocPopup
} from "../../utils";
import { gotoApplyWithStep } from "../../utils/index";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  toggleSnackbar,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import generateReceipt from "../../utils/receiptPdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import get from "lodash/get";
import some from "lodash/some";
import set from "lodash/set";
import { adhocPopup1, adhocPopup2 } from "../payResource/adhocPopup";
import {
  getAccessToken,
  getOPMSTenantId,
  getLocale,
  getUserInfo,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import { getapplicationType } from "egov-ui-kit/utils/localStorageUtils";
import { callbackforsummaryaction,callbackforsummaryactionpay } from '../advertisement_summary'

let role_name = JSON.parse(getUserInfo()).roles[0].code
let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
let tenant = getQueryArg(window.location.href, "tenantId");

export const generatePdfFromDiv = (action, applicationNumber) => {
  let target = document.querySelector("#custom-atoms-div");
  html2canvas(target, {
    onclone: function (clonedDoc) {
      // clonedDoc.getElementById("custom-atoms-footer")[
      //   "data-html2canvas-ignore"
      // ] = "true";
      clonedDoc.getElementById("custom-atoms-footer").style.display = "none";
    }
  }).then(canvas => {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var doc = new jsPDF("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    if (action === "download") {
      doc.save(`preview-${applicationNumber}.pdf`);
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {
    if (activeStep === 2 && mode === "next") {
      const isDocsUploaded = get(
        state.screenConfiguration.preparedFinalObject,
        "LicensesTemp[0].reviewDocData",
        null
      );
      activeStep = isDocsUploaded ? 3 : 2;
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  // const isNextButtonVisible = activeStep < 3 ? true : false;
  const isPayButtonVisible = activeStep === 3 ? true : false;
  if (JSON.parse(getUserInfo()).roles[0].code == "CITIZEN") {
    //alert(JSON.parse(getUserInfo()).roles[0].code)
    const isNextButtonVisible = false

  }
  else {
    const isNextButtonVisible = false

  }
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.footer.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.footer.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.footer.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    },
    {
      path: "components.div.children.footer.children.reject",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.footer.children.reaasign",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.footer.children.approve",
      property: "visible",
      value: true
    },
  ];
  dispatchMultipleFieldChangeAction("apply", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = path => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardFourthStep",
      property: "visible",
      value: false
    }
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
};

export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        height: "48px",
        marginRight: "16px",

      }
    },
    children: {
      cancelButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "NOC_CANCEL_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callbackforsummaryaction
    },
    visible: false
  },

  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "FORWARD",
        labelKey: "FORWARD"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => showHideAdhocPopupopmsForward(state, dispatch, "advertisementnoc-search-preview", "nextButton")
    },
    visible: false

  },
  reject: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "REJECT",
        labelKey: "REJECT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",

      callBack: (state, dispatch) => {


        showHideAdhocPopupopmsReject(state, dispatch, "advertisementnoc-search-preview", "reject")
      }
    },
    visible: role_name == "COMMISSIONER" ? true : false
  },
  reassign: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "REASSIGN",
        labelKey: "REASSIGN"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",

      callBack: (state, dispatch) => {


        showHideAdhocPopupopmsReassign(state, dispatch, "advertisementnoc-search-preview", "reject")
      }
    },
    visible: false
  },
  approve: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "APPROVE",
        labelKey: "APPROVE"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",

      callBack: (state, dispatch) => {


        showHideAdhocPopupopmsApprove(state, dispatch, "advertisementnoc-search-preview", "reject")
      }
    },
    visible: role_name == "COMMISSIONER" ? true : false
  },
  withdrawapprove: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "FORWARD",
        labelKey: "FORWARD"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",

      callBack: (state, dispatch) => {
        showHideAdhocPopup(state, dispatch, "advertisementnoc-search-preview")
      }
    },
    visible: false

  },
  withdraw: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "WITHDRAW ",
        labelKey: "WITHDRAW "
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",

      callBack: (state, dispatch) => {
        showHideAdhocPopup(state, dispatch, "advertisementnoc-search-preview")
      }
    },
    visible: false
  },
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "MAKE PAYMENT",
        labelKey: "NOC_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: `/egov-common/pay?consumerCode=${applicationNumber}&tenantId=${tenant}&businessService=OPMSNOC`
    },
    
    roleDefination: {
      rolePath: "user-info.roles",
      action: "PAY"
    },
    visible:  false
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        // minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "SUBMIT",
        labelKey: "NOC_SUBMIT_BUTTON"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callbackforsummaryactionpay
    }
  }


});

export const footerReview = (
  action,
  state,
  dispatch,
  status,
  applicationNumber,
  tenantId
) => {
  /** MenuButton data based on status */
  let downloadMenu = [];
  let printMenu = [];
  let pmCertificateDownloadObject = {
    label: { labelName: "PM Certificate", labelKey: "PM_CERTIFICATE" },
    link: () => {
      generateReceipt(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  let pmCertificatePrintObject = {
    label: { labelName: "PM Certificate", labelKey: "PM_CERTIFICATE" },
    link: () => {
      generateReceipt(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "PM_RECEIPT" },
    link: () => {
      generateReceipt(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "PM_RECEIPT" },
    link: () => {
      generateReceipt(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "PM_APPLICATION" },
    link: () => {
      generatePdfFromDiv("download", applicationNumber);
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "PM_APPLICATION" },
    link: () => {
      generatePdfFromDiv("print", applicationNumber);
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [
        pmCertificateDownloadObject,
        receiptDownloadObject,
        applicationDownloadObject
      ];
      printMenu = [
        pmCertificatePrintObject,
        receiptPrintObject,
        applicationPrintObject
      ];
      break;
    case "APPLIED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "pending_approval":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "CANCELLED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return getCommonApplyFooter({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        leftdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: { textAlign: "left", display: "flex" }
          },
          children: {
            downloadMenu: {
              uiFramework: "custom-atoms-local",
              moduleName: "egov-OPMS",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Download",
                  leftIcon: "cloud_download",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: downloadMenu
                }
              }
            },
            printMenu: {
              uiFramework: "custom-atoms-local",
              moduleName: "egov-OPMS",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Print",
                  leftIcon: "print",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: printMenu
                }
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        },
        rightdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            rejectButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "16px",
                  borderRadius: "inherit"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "Reject",
                  labelKey: "PM_APPROVER_TRADE_APP_BUTTON_REJECT"
                })
              },
              visible: getButtonVisibility(status, "REJECT"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["PM_APPROVER"]
              }
            },
            approveButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "APPROVE",
                  labelKey: "PM_APPROVER_TRADE_APP_BUTTON_APPROVE"
                })
              },
              visible: getButtonVisibility(status, "APPROVE"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["PM_APPROVER"]
              }
            },
            proceedPayButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "PROCEED TO PAYMENT",
                  labelKey: "PM_COMMON_BUTTON_PROC_PMT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `/egov-common/pay?consumerCode=${applicationNumber}&tenantId=${tenantId}&businessService=NewTL`
              },
              roleDefination: {
                rolePath: "user-info.roles",
                action: "PAY"
              }
            },
            cancelButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "CANCEL TRADE LICENSE",
                  labelKey: "PM_COMMON_BUTTON_CANCEL_LICENSE"
                })
              },
              visible: getButtonVisibility(status, "CANCEL TRADE LICENSE"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["PM_APPROVER"]
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        }
      }
    }
  });
};


export const downloadPrintContainer = (
  action,
  state,
  dispatch,
  status,
  applicationNumber,
  tenantId
) => {
  /** MenuButton data based on status */
  let downloadMenu = [];
  let printMenu = [];
  let pmCertificateDownloadObject = {
    label: { labelName: "PM Certificate", labelKey: "PM_CERTIFICATE" },
    link: () => {
      generateReceipt(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  let pmCertificatePrintObject = {
    label: { labelName: "PM Certificate", labelKey: "PM_CERTIFICATE" },
    link: () => {
      generateReceipt(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "PM_RECEIPT" },
    link: () => {
      generateReceipt(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "PM_RECEIPT" },
    link: () => {
      generateReceipt(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "PM_APPLICATION" },
    link: () => {
      generatePdfFromDiv("download", applicationNumber);
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "PM_APPLICATION" },
    link: () => {
      generatePdfFromDiv("print", applicationNumber);
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [
        pmCertificateDownloadObject,
        receiptDownloadObject,
        applicationDownloadObject
      ];
      printMenu = [
        pmCertificatePrintObject,
        receiptPrintObject,
        applicationPrintObject
      ];
      break;
    case "APPLIED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "pending_approval":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "CANCELLED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return {
    leftdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "left", display: "flex" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-OPMS",
          componentPath: "MenuButton",
          props: {
            data: {
              label: "Download",
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { marginLeft: 10 } },
              menu: downloadMenu
            }
          }
        },
        printMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-OPMS",
          componentPath: "MenuButton",
          props: {
            data: {
              label: "Print",
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { marginLeft: 10 } },
              menu: printMenu
            }
          }
        }
      },
      // gridDefination: {
      //   xs: 12,
      //   sm: 6
      // }
    }
  }
};
