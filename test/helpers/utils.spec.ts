/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-05-03 14:26:41
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-05-03 21:44:19
 * @FilePath: /ts-axios/test/helpers/utils.spec.ts
 * @Description: Do something ...
 */
import {
  isDate,
  isPlainObject,
  isObject,
  extend,
  deepMerge,
  isURLSearchParams,
  isFormData
} from '../../src/helpers/utils'

describe('helpers:util', () => {
  describe('isxxx', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate isPlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate isObject', () => {
      expect(isObject({})).toBeTruthy()
      expect(isObject([])).toBeTruthy()
    })

    test('should validate isURLsearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('test=mock&type=a')).toBeFalsy()
    })

    test('should validate isFormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)

      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should extend prototies', () => {
      const a = { foo: 123, bar: 456 }

      const b = { bar: 789 }

      const c = extend(a, b)

      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)

      const b: any = { foo: 124 }

      const c: any = { bar: 789 }

      deepMerge(a, b, c)

      expect(a.foo).toBe(undefined)
      expect(a.bar).toBe(undefined)
      expect(b.bar).toBe(undefined)
      expect(c.foo).toBe(undefined)
    })

    test('should deepMerge prototies', () => {
      const a = { foo: 123 }
      const b = { bar: 456 }
      const c = { foo: 789 }

      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    // 应该递归地进行深度合并
    test('should deepMerge recursively', () => {
      const a = { foo: { bar: 124 } }
      const b = { foo: { baz: 987 }, bar: 134 }

      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 124,
          baz: 987
        },
        bar: 134
      })
    })

    // 应删除嵌套对象中的所有引用
    test('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}

      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123
        }
      })

      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})

      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })

      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})

      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })

      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
