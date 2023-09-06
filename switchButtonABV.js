
const defineStandarColors =  {
    __CONTAINER_NODE__: {
        success: '#00A887',
        default: '#005EA4'
    },
    __CONTAINER_ONE__: {
        backgroundFlex: '#1aaee5',
        backgroundIcono:'#1aaee5',
        ico: 'ico-chevron_right'
    },
    __CONTAINER_TWO__: {
        backgroundFlex: '#FFFFFF',
        colorText: '#1aaee5'
    },
    __DISABLED_SwithABV__: {
        backgroundNode: '#B6B6B6',
        backgroundIco: '#CACACA',
        colorIco: '#979797',
    },
};


const UseSwithButtonABV = (_vm) => {
    return new Promise((resolve, reject) => {
        if(_vm.options.show) {
            let building = templateSwithABV(_vm);
            _vm.options.disableButton ?  disableControlSwithABV() : enableControlSwithABV(_vm);
        }

        let doubleClick = false;
        let switchABV_Confirm = document.getElementById('swithABV-confirm');
        switchABV_Confirm.addEventListener("click", () => {
            let switchConfirm = document.getElementById('swithABV-confirm');
            hasClassBtnDisable = switchConfirm.classList.contains('btn-disabled');

            if(!hasClassBtnDisable){
                if(!doubleClick){
                    loadingswithABV(), 
                    resolve(true)
                    doubleClick = true;
                }
            }
        });

    })
};

const templateSwithABV = (_vm) => {
    
    let customBackgroundColor = _vm.configurable.content_one_button.useColor === '' ||  _vm.configurable.content_one_button.useColor !== undefined ? 
    (_vm.configurable.content_one_button.useColor.backgroundIco)  :
    (_vm.options.disableButton ? (defineStandarColors.__DISABLED_SwithABV__.backgroundIco) : 
    (defineStandarColors.__CONTAINER_ONE__.backgroundIcono));

    let customBackgroundNodeContainer = _vm.configurable.content_node === '' ||  _vm.configurable.content_node !== undefined ? 
    (_vm.configurable.content_node.customizable) : (defineStandarColors.__CONTAINER_NODE__.default);

    let customColorText = _vm.configurable.content_one_button.useColor === '' ||  _vm.configurable.content_one_button.useColor !== undefined ? 
    (_vm.configurable.content_one_button.useColor.colorText)  : ( defineStandarColors.__CONTAINER_ONE__.backgroundIcono);


    let construcButtonSlider = document.getElementById('SwitchABV');
    construcButtonSlider.innerHTML = '';
    construcButtonSlider.innerHTML = `
    <div class="container-swithABV" style="background-color: ${customBackgroundNodeContainer}">
    <div class="contains-texto-inicio" id="contains-texto-inicio">NUEVO TEXTO</div>
    <div class="flex-container">
        <div class="container-left" style="background-color: ${customBackgroundColor}">
            <div id="swithABV-on">
                <div class="contains-icon">
                    <i class="complement-ico ico ico32 ${defineStandarColors.__CONTAINER_ONE__.ico}"  style="background-color: ${customBackgroundColor}"></i>
                </div>
            </div>
            <div class="contains-information" id="contains-information" style= "color: ${customColorText}"></div>
        </div>
        <div class="container-right d-none">
            <div class="contains-button-confirm">
                <div id="swithABV-confirm" class="swithABV-confirm">
                    
                </div>
            </div>
        </div>
    </div>
</div>`;
};

const enableControlSwithABV = (_vm) => {
    let switchABV_ON = document.getElementById('swithABV-on');
    switchABV_ON.addEventListener("click", () => {

        let BackgroundContentONEDefalutOrValue =  _vm.configurable.content_one_button.useColor === '' ||  _vm.configurable.content_one_button.useColor !== undefined ? (_vm.configurable.content_one_button.useColor.backgroundButton) : ( defineStandarColors.__CONTAINER_ONE__.backgroundFlex);
        let BackgroundContentTWODefalutOrValue =  _vm.configurable.content_two_button.useColor === '' ||  _vm.configurable.content_two_button.useColor !== undefined ? (_vm.configurable.content_two_button.useColor.backgroundButton) : ( defineStandarColors.__CONTAINER_TWO__.backgroundFlex);
        let backgroundIconDefalutOrValue =  _vm.configurable.content_one_button.useColor === '' ||  _vm.configurable.content_one_button.useColor !== undefined ? (_vm.configurable.content_one_button.useColor.backgroundIco)  : ( defineStandarColors.__CONTAINER_ONE__.backgroundIcono);
        
        switchABV_ON.classList.toggle('active');
        let hasClassActive = switchABV_ON.classList.contains('active');

        const controlSwitchABV = {
            divNone: {
                containerNode: document.querySelector('.container-swithABV'),
            },
            divLeft:{
                container_left: document.querySelector('.container-left'),
                contains_ico: document.querySelector('.contains-icon'),
                background_ico: document.querySelector('.complement-ico'),
                contains_information: document.querySelector('.contains-information'),
                
            },
            divRight:{
                container_right: document.querySelector('.container-right'),
                confirm: document.querySelector('.swithABV-confirm'),
            },
        };

        const controlTransitions = {
            container_left:{
                flexON: 60,
                flexOFF: 0,
                smoothEffect: 'all 1s ease 0s',
            },
            container_right: {
                smoothEffect: 'all 0.3s ease 0s',
            }
        }
        
        const controlColorsAndStyleDefault = {
            container_left:{
                backgroundColorON: BackgroundContentONEDefalutOrValue,
                borderRadius: '50%',
            },
            container_right: {
                textColorON: 'white',
                textColorOFF: '#ffffff00',
                backgroundColorON: BackgroundContentTWODefalutOrValue,
                backgroundColorOFF: '#ffffff00',
            }
        };

        let colorText = _vm.configurable.content_two_button.useColor === '' || _vm.configurable.content_two_button.useColor !== undefined ?  _vm.configurable.content_two_button.useColor.colorText : defineStandarColors.__CONTAINER_TWO__.colorText;
        const controlInformation = {
            addTextOnDivLeft: `<p class="text-information">${_vm.configurable.content_one_button.IniText}</p>`,
            addTextOFFDivLeft: '',

            addTextOnDivRight: `<p class="text-confirmation" style="color: ${colorText}">${_vm.configurable.content_two_button.IniText}</p>`,
            addTextOFFDivRight: '',
        };

        const controlIcons = {
            createIconON: `<i class="complement-ico ico ico32 ico-error" style="background: ${backgroundIconDefalutOrValue}"></i>`,
            createIconOFF: '<i class="complement-ico ico ico32 ico-chevron_right"></i>',
            cleanIcon: '',
        };

        if(hasClassActive){
            controlSwitchABV.divLeft.container_left.style.flex = controlTransitions.container_left.flexON;
            controlSwitchABV.divLeft.container_left.style.background = controlColorsAndStyleDefault.container_left.backgroundColorON;
            controlSwitchABV.divLeft.container_left.style.transition = controlTransitions.container_left.smoothEffect;
            controlSwitchABV.divLeft.container_left.style.zIndex = 1

            controlSwitchABV.divLeft.contains_information.innerHTML = controlInformation.addTextOnDivLeft;
            controlSwitchABV.divLeft.contains_information.style.background = controlTransitions.container_left.backgroundColorON;
            controlSwitchABV.divLeft.contains_information.style.borderRadius = controlColorsAndStyleDefault.container_left.borderRadius;

            controlSwitchABV.divRight.container_right.classList.remove("d-none");
            controlSwitchABV.divRight.confirm.innerHTML = controlInformation.addTextOnDivRight;
            controlSwitchABV.divRight.container_right.style.background = controlColorsAndStyleDefault.container_right.backgroundColorON;
            controlSwitchABV.divRight.container_right.style.color = controlColorsAndStyleDefault.container_right.textColorON;
            controlSwitchABV.divRight.container_right.style.transition = controlTransitions.container_right.smoothEffect;

            controlSwitchABV.divLeft.contains_ico.innerHTML = controlIcons.cleanIcon;
            controlSwitchABV.divLeft.contains_ico.innerHTML = controlIcons.createIconON;
        }else{
            controlSwitchABV.divLeft.container_left.style.flex = controlTransitions.container_left.flexOFF;
            controlSwitchABV.divLeft.container_left.style.transition = controlTransitions.container_left.smoothEffect;
            controlSwitchABV.divLeft.contains_information.innerHTML = controlInformation.addTextOFFDivLeft;

            controlSwitchABV.divRight.container_right.style.background = controlColorsAndStyleDefault.container_right.backgroundColorOFF;
            controlSwitchABV.divRight.container_right.style.color = controlColorsAndStyleDefault.container_right.textColorOFF;
            controlSwitchABV.divRight.container_right.style.transition = controlTransitions.container_right.smoothEffect;
            setTimeout( () => {controlSwitchABV.divRight.confirm.innerHTML = controlInformation.addTextOFFDivRight;  },100 );

            controlSwitchABV.divLeft.contains_ico.innerHTML = controlIcons.cleanIcon;
            controlSwitchABV.divLeft.contains_ico.innerHTML = controlIcons.createIconOFF;
        }
    });
};


const disableControlSwithABV = () => {
    const controlSwitchABV = {
        divNone: {
            containerNode: document.querySelector('.container-swithABV'),
        },
        divLeft:{
            container_left: document.querySelector('.container-right'),
            background_ico: document.querySelector('.complement-ico'),
        },
    };
    controlSwitchABV.divNone.containerNode.style.background     =  defineStandarColors.__DISABLED_SwithABV__.backgroundNode;
    controlSwitchABV.divLeft.container_left.style.background  =  defineStandarColors.__DISABLED_SwithABV__.backgroundIco
    controlSwitchABV.divLeft.background_ico.style.background   =  defineStandarColors.__DISABLED_SwithABV__.backgroundIco
    controlSwitchABV.divLeft.background_ico.style.color =      defineStandarColors.__DISABLED_SwithABV__.colorIco;
};

const loadingswithABV = () => {
    const controlTransitions = {
        container_left:{
            flexON: 100,
            smoothEffect: 'all 1.3s ease 0s',
        },
        container_right: {
            flexON: 8,
            smoothEffect: 'all 0.3s ease 0s',
        }
    };
    const controlSwitchABV = {
        divLeft:{
            container_left: document.querySelector('.container-left'),
            contains_information: document.querySelector('.contains-information'),
        },
        divRight:{
            container_right: document.querySelector('.container-right'),
            confirm: document.querySelector('.swithABV-confirm'),
        },
    };

    const controlInformation = {
        addTextOnDivLeft: `<p class="text-information">Espera un momento</p>`,
        addTextOFFDivLeft: '',
        addTextOnDivRight: `<div class="loading-swithABV"></div>`,
        addTextOFFDivRight: '',
    };


    controlSwitchABV.divLeft.container_left.style.flex = controlTransitions.container_left.flexON;
    controlSwitchABV.divRight.container_right.style.flex = controlTransitions.container_right.flexON;
    controlSwitchABV.divLeft.container_left.style.transition = controlTransitions.container_left.smoothEffect;
    controlSwitchABV.divLeft.contains_information.innerHTML = controlInformation.addTextOnDivLeft;
    controlSwitchABV.divRight.confirm.innerHTML = controlInformation.addTextOFFDivRight;
    controlSwitchABV.divRight.confirm.innerHTML = controlInformation.addTextOnDivRight;
}

const SwithButtonABVFinished = (status_success) => {
    const controlSwitchABV = {
        divNone: {
            containerNode: document.querySelector('.container-swithABV'),
        },
        divLeft:{
            container_left: document.querySelector('.container-left'),
            contains_ico: document.querySelector('.contains-icon'),
            contains_information: document.querySelector('.contains-information'),
            
        },
        divRight:{
            container_right: document.querySelector('.container-right'),
            confirm: document.querySelector('.swithABV-confirm'),
        },
    };

    const controlTransitions = {
        container_left:{
            flexON: 100,
            smoothEffect: 'all 1.3s ease 0s',
        },
        container_right: {
            flexON: 7,
            smoothEffect: 'all 0.3s ease 0s',
            boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 8px',
        }
    };

    const controlIcons = {
        cleanIcon: '',
    };

    const controlInformation = {
        addTextOnDivLeft: `<p class="text-information">Espera un momento</p>`,
        addTextOFFDivLeft: '',
        addTextOnDivRight: `<i class="ico ico32 ico-check"></i>`,
        addTextOFFDivRight: '',
    };

    let customBackgroundNodeContainer = status_success === '' ||  status_success !== undefined ? 
    (status_success.configurable.content_node.success  === '' ||  status_success.configurable.content_node.success !== undefined ? 
    (status_success.configurable.content_node.success) : ('') ) :
    (defineStandarColors.__CONTAINER_NODE__.default);

    controlSwitchABV.divLeft.container_left.style.zIndex = -1
    controlSwitchABV.divLeft.container_left.style.flex = controlTransitions.container_left.flexON;
    controlSwitchABV.divRight.container_right.style.flex = controlTransitions.container_right.flexON;
    // controlSwitchABV.divRight.container_right.style.transition = controlTransitions.container_right.smoothEffect;
    

    controlSwitchABV.divRight.confirm.innerHTML = controlInformation.addTextOFFDivRight;
    controlSwitchABV.divRight.confirm.innerHTML = controlInformation.addTextOnDivRight;
    controlSwitchABV.divRight.confirm.style.color  =  defineStandarColors.__CONTAINER_NODE__.success;
    controlSwitchABV.divRight.container_right.style["boxShadow"] = controlTransitions.container_right.boxShadow;
    
    controlSwitchABV.divLeft.contains_information.innerHTML = controlInformation.addTextOFFDivRight;
    controlSwitchABV.divLeft.contains_ico.innerHTML = controlIcons.cleanIcon;

    controlSwitchABV.divLeft.container_left.style.background  =  'rgb(0 94 164 / 0%)';
    controlSwitchABV.divLeft.container_left.style.transition = 'all 0s ease 0s'
    controlSwitchABV.divNone.containerNode.style.background   =  customBackgroundNodeContainer;
    controlSwitchABV.divRight.confirm.classList.add('btn-disabled');
};