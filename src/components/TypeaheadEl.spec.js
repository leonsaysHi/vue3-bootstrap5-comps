import TypeaheadEl from '@/TypeaheadEl.vue'
import { mount } from '@vue/test-utils'

const options = [
    { text: 'Option 1', value: 1 }, 
    { text: 'Option 2', value: 2 }, 
    { text: 'Option 3', value: 3 },
    { text: 'Option 4', value: 4 }
]

describe('Typeahead input', () => {
    let wrapper, input, menu
    beforeEach(async () => {
        wrapper = mount(TypeaheadEl)
        await wrapper.vm.$nextTick()
        input = wrapper.find('input[type="text"]')
        menu = wrapper.find('.dropdown-menu')
    });

    it('Renders input and menu', async () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(input.exists()).toBeTruthy()
        expect(menu.exists()).toBeTruthy()
        const optionEls = menu.findAll('.dropdown-item')
        expect(optionEls).toHaveLength(0)
        expect(menu.classes()).not.toContain('show')
    })

    it('Typing triggers emits', async () => {
        await input.setValue('te')
        expect(wrapper.emitted('update:searchString').length).toBe(1)
        expect(wrapper.emitted('update:searchString')[0]).toEqual(['te'])
    })

    it('Show menu with options', async () => {
        wrapper.setProps({
            options
        })
        await wrapper.vm.$nextTick()
        const optionEls = menu.findAll('.dropdown-item')
        expect(optionEls).toHaveLength(options.length)
        expect(menu.classes()).toContain('show')
    })

    it('Clicking options triggers emit the selected option', async () => {
        wrapper.setProps({
            options
        })
        await wrapper.vm.$nextTick()
        const optionEls = menu.findAll('.dropdown-item')
        await optionEls[1].trigger('click')
        expect(wrapper.emitted('select').length).toBe(1)
        expect(wrapper.emitted('select')[0]).toEqual([options[1].value])
    })


})
