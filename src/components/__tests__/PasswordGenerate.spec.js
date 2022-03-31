import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PasswordGenerate from '../PasswordGenerate.vue'

describe('PasswordGenerate', () => {
  it('renders properly', () => {
    const wrapper = mount(PasswordGenerate,)
    expect(wrapper.text()).toContain('OTP')
  })
})
