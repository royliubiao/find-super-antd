/*
 * @Author: your name
 * @Date: 2020-02-23 15:01:22
 * @LastEditTime: 2020-02-23 17:08:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /online-education-admin/postcss.config.js
 */
module.exports = {
    plugins: {
      'postcss-preset-env': {
        stage: 0,
        features: {
          'nesting-rules': true
        }
      }
    }
    // plugins:[require('autoprefixer')]
  };
  