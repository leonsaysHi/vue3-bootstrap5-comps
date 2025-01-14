import FormCheckGroup from '@/components/elements/FormCheckGroup.vue'
import { mount } from '@vue/test-utils'

const options = [
    { text: 'Check 1', value: 1 }, 
    { text: 'Check 2', value: 2 }, 
    { text: 'Check 3', value: 3 },
    { text: 'Check 4', value: 4 }
]

describe('Check Group input', () => {
    let wrapper, checkboxes
    beforeEach(async () => {
        wrapper = mount(FormCheckGroup)
        wrapper.setProps({
            modelValue: undefined,
            options
        })
        await wrapper.vm.$nextTick()
        checkboxes = wrapper.findAll('input[type="checkbox"]')
    });

    it('Renders the checkboxes', async () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(checkboxes).toHaveLength(options.length)
    })

    it('Emits to clicks on checkboxes', async () => {
        await checkboxes[0].trigger('click')
        expect(wrapper.emitted('update:modelValue').length).toBe(1)
        expect(wrapper.emitted('update:modelValue')[0]).toEqual([[1]])
        wrapper.setProps({
            modelValue: [1],
            options
        })
        await wrapper.vm.$nextTick()
        await checkboxes[3].trigger('click')
        expect(wrapper.emitted('update:modelValue').length).toBe(2)
        expect(wrapper.emitted('update:modelValue')[1]).toEqual([[1,4]])
    })

    it('Checkboxes are checked', async () => {
        wrapper.setProps({
            modelValue: [1, 3],
            options
        })
        await wrapper.vm.$nextTick()
        expect(checkboxes[0].element.checked).toBe(true)
        expect(checkboxes[1].element.checked).toBe(false)
        expect(checkboxes[2].element.checked).toBe(true)
        expect(checkboxes[3].element.checked).toBe(false)
    })

})
