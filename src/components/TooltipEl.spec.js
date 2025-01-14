import TooltipEl from '@/TooltipEl.vue'
import { mount } from '@vue/test-utils'

describe('Tooltip', () => {
    let wrapper, referenceRef, floatingRef
    beforeEach(async () => {
        wrapper = mount(TooltipEl)
        await wrapper.vm.$nextTick()
        referenceRef = wrapper.find({ ref: 'referenceRef' })
        floatingRef = wrapper.find({ ref:'floatingRef' })
    });

    it('Renders tooltip', async () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(referenceRef.exists()).toBeTruthy()
        expect(floatingRef.exists()).toBeTruthy()
        expect(floatingRef.classes()).not.toContain('--show')
    })

    it('mouseenter/mouseleave triggers --show class', async () => {
        await referenceRef.trigger('mouseenter')
        expect(floatingRef.classes()).toContain('--show')
        await referenceRef.trigger('mouseleave')
        expect(floatingRef.classes()).not.toContain('--show')
    })
})
