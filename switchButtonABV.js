
const UseSwithButtonABV = (_vm) => {
    return new Promise((resolve, reject) => {
        const defineStandarColors =  {
            __CONTAINER_ONE__: {
                backgroundFlex: 'purple',
                backgroundIcono:'purple'
            },
            __CONTAINER_TWO__: {
                backgroundFlex: '#FFFFFF',
                colorText: '#1aaee5'
            },
            __DISABLED_SwithABV__: {
                backgroundNode: '#B6B6B6',
                backgroundIco: '#CACACA',
                colorIco: '#979797',
            }
        };
    
        if(_vm.options.show) {
            let building = templateSwithABV(_vm, defineStandarColors);
            _vm.options.disableButton ?  disableControlSwithABV(defineStandarColors) : enableControlSwithABV(_vm, defineStandarColors);
        }  


        let switchABV_Confirm = document.getElementById('swithABV-confirm');
        switchABV_Confirm.addEventListener("click", () => {
            // _vm.callFunction === '' || _vm.callFunction === undefined ? (console.warn("The button was deactivated!")) : (eval(`${_vm.callFunction}()`));
            let idCONFIRM = document.getElementById('swithABV-confirm')
            idCONFIRM = idCONFIRM.classList.contains('bloqueo');
            !idCONFIRM ? (loadingswithABV(), resolve(true) ) : (reject('fail'));
        });

    })
};

const templateSwithABV = (_vm, _defineStandarColors) => {
    let construcButtonSlider = document.getElementById('SwitchABV');
    let customBackgroundColor = _vm.configurable.content_one_button.useColor === '' ||  _vm.configurable.content_one_button.useColor !== undefined ? (_vm.configurable.content_one_button.useColor.backgroundIco)  : (_defineStandarColors.__CONTAINER_ONE__.backgroundIcono);
    let defaultIcon = '<i class="complement-ico ico ico32 ico-chevron_right"></i>';
    construcButtonSlider.innerHTML = '';
    construcButtonSlider.innerHTML = `
    <div class="container-swithABV">
    <div class="flex-container">
        <div class="container-right" style="background-color: ${customBackgroundColor}">
            <div id="swithABV-on">
                <div class="contains-icon">
                    ${defaultIcon}
                </div>
            </div>
            <div class="contains-information" id="contains-information"></div>
        </div>
        <div class="container-left d-none">
            <div class="contains-button-confirm">
                <div id="swithABV-confirm" class="swithABV-confirm">
                    
                </div>
            </div>
        </div>
    </div>
</div>
`;
};



const enableControlSwithABV = (_vm, _defineStandarColors) => {
    let switchABV_ON = document.getElementById('swithABV-on');
    switchABV_ON.addEventListener("click", () => {

        let BackgroundContentONEDefalutOrValue =  _vm.configurable.content_one_button.useColor === '' ||  _vm.configurable.content_one_button.useColor !== undefined ? (_vm.configurable.content_one_button.useColor.backgroundText) : ( _defineStandarColors.__CONTAINER_ONE__.backgroundFlex);
        let BackgroundContentTWODefalutOrValue =  _vm.configurable.content_two_button.useColor === '' ||  _vm.configurable.content_two_button.useColor !== undefined ? (_vm.configurable.content_two_button.useColor.backgroundText) : ( _defineStandarColors.__CONTAINER_TWO__.backgroundFlex);
        let backgroundIconDefalutOrValue =  _vm.configurable.content_one_button.useColor === '' ||  _vm.configurable.content_one_button.useColor !== undefined ? (_vm.configurable.content_one_button.useColor.backgroundIco)  : ( _defineStandarColors.__CONTAINER_ONE__.backgroundIcono);
        
        switchABV_ON.classList.toggle('active');
        let hasClassActive = switchABV_ON.classList.contains('active');

        const controlSwitchABV = {
            divNone: {
                containerNone: document.querySelector('.container-swithABV'),
            },
            divRight:{
                container_right: document.querySelector('.container-right'),
                contains_ico: document.querySelector('.contains-icon'),
                background_ico: document.querySelector('.complement-ico'),
                contains_information: document.querySelector('.contains-information'),
                
            },
            divLeft:{
                container_left: document.querySelector('.container-left'),
                confirm: document.querySelector('.swithABV-confirm'),
            },
        };

        const controlTransitions = {
            container_right:{
                flexON: 60,
                flexOFF: 0,
                smoothEffect: 'all 1s ease 0s',
            },
            container_left: {
                smoothEffect: 'all 0.3s ease 0s',
            }
        }
        
        const controlColorsAndStyleDefault = {
            container_right:{
                backgroundColorON: BackgroundContentONEDefalutOrValue,
                borderRadius: '50%',
            },
            container_left: {
                textColorON: 'white',
                textColorOFF: '#ffffff00',
                backgroundColorON: BackgroundContentTWODefalutOrValue,
                backgroundColorOFF: '#ffffff00',
            }
        };

        let colorText = _vm.configurable.content_two_button.useColor === '' || _vm.configurable.content_two_button.useColor !== undefined ?  _vm.configurable.content_two_button.useColor.colorText : _defineStandarColors.__CONTAINER_TWO__.colorText;
        const controlInformation = {
            addTextOnDivRight: `<p class="text-information">${_vm.configurable.content_one_button.IniText}</p>`,
            addTextOFFDivRight: '',

            addTextOnDivleft: `<p class="text-confirmation" style="color: ${colorText}">${_vm.configurable.content_two_button.IniText}</p>`,
            addTextOFFDivleft: '',
        };

        const controlIcons = {
            createIconON: `<i class="complement-ico ico ico32 ico-error" style="background: ${backgroundIconDefalutOrValue}"></i>`,
            createIconOFF: '<i class="complement-ico ico ico32 ico-chevron_right"></i>',
            cleanIcon: '',
        };

        if(hasClassActive){
            controlSwitchABV.divRight.container_right.style.flex = controlTransitions.container_right.flexON;
            controlSwitchABV.divRight.container_right.style.background = controlColorsAndStyleDefault.container_right.backgroundColorON;
            controlSwitchABV.divRight.container_right.style.transition = controlTransitions.container_right.smoothEffect;

            controlSwitchABV.divRight.contains_information.innerHTML = controlInformation.addTextOnDivRight;
            controlSwitchABV.divRight.contains_information.style.background = controlTransitions.container_right.backgroundColorON;
            controlSwitchABV.divRight.contains_information.style.borderRadius = controlColorsAndStyleDefault.container_right.borderRadius;

            controlSwitchABV.divLeft.container_left.classList.remove("d-none");
            controlSwitchABV.divLeft.confirm.innerHTML = controlInformation.addTextOnDivleft;
            controlSwitchABV.divLeft.container_left.style.background = controlColorsAndStyleDefault.container_left.backgroundColorON;
            controlSwitchABV.divLeft.container_left.style.color = controlColorsAndStyleDefault.container_left.textColorON;
            controlSwitchABV.divLeft.container_left.style.transition = controlTransitions.container_left.smoothEffect;

            controlSwitchABV.divRight.contains_ico.innerHTML = controlIcons.cleanIcon;
            controlSwitchABV.divRight.contains_ico.innerHTML = controlIcons.createIconON;
        }else{
            controlSwitchABV.divRight.container_right.style.flex = controlTransitions.container_right.flexOFF;
            controlSwitchABV.divRight.container_right.style.transition = controlTransitions.container_right.smoothEffect;
            controlSwitchABV.divRight.contains_information.innerHTML = controlInformation.addTextOFFDivRight;

            controlSwitchABV.divLeft.container_left.style.background = controlColorsAndStyleDefault.container_left.backgroundColorOFF;
            controlSwitchABV.divLeft.container_left.style.color = controlColorsAndStyleDefault.container_left.textColorOFF;
            controlSwitchABV.divLeft.container_left.style.transition = controlTransitions.container_left.smoothEffect;
            setTimeout( () => {controlSwitchABV.divLeft.confirm.innerHTML = controlInformation.addTextOFFDivleft;  },300 );

            controlSwitchABV.divRight.contains_ico.innerHTML = controlIcons.cleanIcon;
            controlSwitchABV.divRight.contains_ico.innerHTML = controlIcons.createIconOFF;
        }
    });




};



const disableControlSwithABV = (_defineStandarColors) => {
    const controlSwitchABV = {
        divNone: {
            containerNone: document.querySelector('.container-swithABV'),
        },
        divRight:{
            container_right: document.querySelector('.container-right'),
            background_ico: document.querySelector('.complement-ico'),
            
        },
    };

    controlSwitchABV.divNone.containerNone.style.background     =  _defineStandarColors.__DISABLED_SwithABV__.backgroundNode;
    controlSwitchABV.divRight.container_right.style.background  =  _defineStandarColors.__DISABLED_SwithABV__.backgroundIco
    controlSwitchABV.divRight.background_ico.style.background   =  _defineStandarColors.__DISABLED_SwithABV__.backgroundIco
    controlSwitchABV.divRight.background_ico.style.color =      _defineStandarColors.__DISABLED_SwithABV__.colorIco;
};






const loadingswithABV = () => {
    console.log("CLICK")
    const controlTransitions = {
        container_right:{
            flexON: 60,
            flexOFF: 0,
            smoothEffect: 'all 1.3s ease 0s',
        },
        container_left: {
            smoothEffect: 'all 0.3s ease 0s',
        }
    }

    const controlSwitchABV = {
        divNone: {
            containerNone: document.querySelector('.container-swithABV'),
        },
        divRight:{
            container_right: document.querySelector('.container-right'),
            contains_ico: document.querySelector('.contains-icon'),
            background_ico: document.querySelector('.complement-ico'),
            contains_information: document.querySelector('.contains-information'),
            
        },
        divLeft:{
            container_left: document.querySelector('.container-left'),
            confirm: document.querySelector('.swithABV-confirm'),
        },
    };


        controlSwitchABV.divRight.container_right.style.flex = 100;
        controlSwitchABV.divRight.container_right.style.transition = controlTransitions.container_right.smoothEffect;

        
        let loadingBootstrap = `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`

        controlSwitchABV.divRight.contains_information.innerHTML = 'Espera un momento';

        controlSwitchABV.divLeft.confirm.innerHTML = '';
        controlSwitchABV.divLeft.confirm.innerHTML = loadingBootstrap;



        bandera = true;

}

const finalizarWith = () => {
    const controlSwitchABV = {
        divNone: {
            containerNone: document.querySelector('.container-swithABV'),
        },
        divRight:{
            container_right: document.querySelector('.container-right'),
            contains_ico: document.querySelector('.contains-icon'),
            contains_information: document.querySelector('.contains-information'),
            
        },
        divLeft:{
            container_left: document.querySelector('.container-left'),
            confirm: document.querySelector('.swithABV-confirm'),
        },
    };


        controlSwitchABV.divRight.container_right.style.flex = 100;
        controlSwitchABV.divLeft.container_left.style.flex = 10;

        let nuevoicono = `@`
        controlSwitchABV.divLeft.confirm.innerHTML = '';
        controlSwitchABV.divLeft.confirm.innerHTML = nuevoicono;
        controlSwitchABV.divRight.contains_information.innerHTML = '';

        controlSwitchABV.divRight.contains_ico.innerHTML = '';
        controlSwitchABV.divRight.container_right.style.background  =  '#00A887'
        controlSwitchABV.divNone.containerNone.style.background  =  '#00A887'
        
    //Bloquear boton
    controlSwitchABV.divLeft.confirm.classList.add('bloqueo');

}
