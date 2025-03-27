'use strict';

const BaseResource = require('./BaseResource'),
      ElasticSearchClient = require('./lib/ElasticSearchClient'),
      region = process.env.AWS_REGION,
      rolesURL = '/_plugins/_security/api/roles';

// Params expected:
// {
//    "Domain": "my-domain",
//    "RoleName": "my-role",
//    "RoleDefinition": {
//       "cluster_permissions": ["cluster_composite_ops"],
//       "index_permissions": [
//          {
//             "index_patterns": ["my-index"],
//             "allowed_actions": ["read"],
//             "allowed_fields": ["myfield1", "myfield2"]
//          }
//       ]
//    }
// }
module.exports = BaseResource.extend({

   doCreate: function (props) {
      const client = new ElasticSearchClient(region, props.Domain);

      return client.send('PUT', `${rolesURL}/${props.RoleName}`, props.RoleDefinition)
         .then((resp) => {
            return {};
         });
   },

   doUpdate: function (physicalResourceId, props, oldProps) {
      const client = new ElasticSearchClient(region, props.Domain);

      return client.send('PUT', `${rolesURL}/${props.RoleName}`, props.RoleDefinition)
         .then((resp) => {
            return {};
         });
   },

   doDelete: function (physicalResourceId, props) {
      const client = new ElasticSearchClient(region, props.Domain);

      // TODO - do we want a success or a failure from a 404?
      return client.send('DELETE', `${rolesURL}/${props.RoleName}`)
         .then(() => {
            return {};
         });
   }
});
