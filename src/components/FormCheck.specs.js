import FormCheck from '@/components/elements/FormCheck.vue'
import { mount } from '@vue/test-utils'

describe('Check input', () => {
    let wrapper, checkbox
    beforeEach(async () => {
        wrapper = mount(FormCheck, {})
        wrapper.setProps({
            modelValue: undefined
        })
        await wrapper.vm.$nextTick()
        checkbox = wrapper.find('input[type="checkbox"]')
    });

    it('Renders the checkbox', async () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(checkbox.exists()).toBeTruthy()
    })

    it('Checked reacts to clicks', async () => {
        expect(checkbox.element.checked).toBe(false)
        await checkbox.trigger('click')
        expect(checkbox.element.checked).toBe(true)
        await checkbox.trigger('click')
        expect(checkbox.element.checked).toBe(false)
    })

    it('Checked reacts to v-model changes', async () => {
        expect(checkbox.element.checked).toBe(false)
        await checkbox.setValue(true)
        expect(checkbox.element.checked).toBe(true)
        await checkbox.setValue(false)
        expect(checkbox.element.checked).toBe(false)
    })

    it('Emits on clicks', async () => {
        await checkbox.trigger('click')
        await checkbox.trigger('click')
        expect(wrapper.emitted('update:modelValue').length).toBe(2)
        expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
        expect(wrapper.emitted('update:modelValue')[1]).toEqual([false])
    })

    it('Emits custom values', async () => {
        wrapper.setProps({
            modelValue: undefined,
            value: '1',
            uncheckValue: '0'
        })
        await wrapper.vm.$nextTick()
        await checkbox.trigger('click')
        await checkbox.trigger('click')
        expect(wrapper.emitted('update:modelValue').length).toBe(2)
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1'])
        expect(wrapper.emitted('update:modelValue')[1]).toEqual(['0'])
    })

    it('Checked inits with custom values and reacts to clicks', async () => {
        wrapper.setProps({
            modelValue: 'on',
            value: 'on',
            uncheckValue: 'off'
        })
        await wrapper.vm.$nextTick()
        expect(checkbox.element.checked).toBe(true)
        await checkbox.trigger('click')
        expect(checkbox.element.checked).toBe(false)
        expect(wrapper.emitted('update:modelValue').length).toBe(1)
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['off'])
    })

    it('Button', async () => {
        wrapper.setProps({
            modelValue: undefined,
            button: true
        })
        await wrapper.vm.$nextTick()
        const buttonLabel = wrapper.find('label.btn')
        expect(buttonLabel.exists()).toBeTruthy()
    })
    it('Switch', async () => {
        wrapper.setProps({
            modelValue: undefined,
            switch: true
        })
        await wrapper.vm.$nextTick()
        const switchWrapper = wrapper.find('div.form-switch')
        expect(switchWrapper.exists()).toBeTruthy()
    })


})
