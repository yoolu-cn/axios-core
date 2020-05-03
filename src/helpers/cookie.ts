/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-04-20 23:12:54
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-04-20 23:15:31
 * @FilePath: /ts-axios/src/helpers/cookie.ts
 * @Description: Do something ...
 */

const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
