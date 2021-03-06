import fgInput from './components/UIComponents/Inputs/formGroupInput.vue'
import fgInputCep from './components/UIComponents/Inputs/formGroupInputCep.vue'
import fgInputLogradouro from './components/UIComponents/Inputs/formGroupInputLogradouro.vue'
import fgInputBairro from './components/UIComponents/Inputs/formGroupInputBairro.vue'
import fgInputCidade from './components/UIComponents/Inputs/formGroupInputCidade.vue'
import fgInputEstado from './components/UIComponents/Inputs/formGroupInputEstado.vue'
import fgInputMask from './components/UIComponents/Inputs/formGroupInputMask.vue'
import fgInputMoney from './components/UIComponents/Inputs/formGroupInputMoney.vue'
import fgSelect from './components/UIComponents/Inputs/formGroupSelect.vue'
import formGroupDatePicker from './components/UIComponents/Inputs/formGroupDatePicker.vue'
import fgTimePicker from './components/UIComponents/Inputs/formGroupTimePicker.vue'
import fgDateTimePicker from './components/UIComponents/Inputs/formGroupDateTimePicker.vue'
import formGroupRadioButton from './components/UIComponents/Inputs/formGroupRadioButton.vue'
import fgDropzone from './components/UIComponents/Inputs/formGroupDropzone.vue'
import fgTextarea from './components/UIComponents/Inputs/formGroupTextarea.vue'
import DropDown from './components/UIComponents/Dropdown.vue'
import Checkbox from './components/UIComponents/Inputs/Checkbox.vue'
import Radio from './components/UIComponents/Inputs/Radio.vue'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 * Ideally, only small components that are re-used many times across your application should be registered here.
 * For plugins and bigger components local registration is preferable because it will allow you to do code splitting easier :)
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component(fgInput.name, fgInput)
    Vue.component(fgTextarea.name, fgTextarea)
    Vue.component(fgInputMask.name, fgInputMask)
    Vue.component(fgInputMoney.name, fgInputMoney)
    Vue.component(fgInputCep.name, fgInputCep)
    Vue.component(fgInputLogradouro.name, fgInputLogradouro)
    Vue.component(fgInputBairro.name, fgInputBairro)
    Vue.component(fgInputCidade.name, fgInputCidade)
    Vue.component(fgInputEstado.name, fgInputEstado)
    Vue.component(formGroupDatePicker.name, formGroupDatePicker)
    Vue.component(formGroupRadioButton.name, formGroupRadioButton)
    Vue.component(fgTimePicker.name, fgTimePicker)
    Vue.component(fgDateTimePicker.name, fgDateTimePicker)
    Vue.component(fgDropzone.name, fgDropzone)
    Vue.component(fgSelect.name, fgSelect)
    Vue.component(DropDown.name, DropDown)
    Vue.component(Checkbox.name, Checkbox)
    Vue.component(Radio.name, Radio)
  }
}

export default GlobalComponents
