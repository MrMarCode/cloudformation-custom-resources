'use strict';

const BaseResource = require('./BaseResource'),
      ElasticSearchClient = require('./lib/ElasticSearchClient'),
      region = process.env.AWS_REGION,
      rolesURL = '/_plugins/_security/api/rolesmapping';

module.exports = BaseResource.extend({
   // https://opensearch.org/docs/latest/security/access-control/api
   // PUT _plugins/_security/api/rolesmapping/<role>
   // {
   //   "backend_roles" : [ "starfleet", "captains", "defectors", "cn=ldaprole,ou=groups,dc=example,dc=com" ],
   //   "hosts" : [ "*.starfleetintranet.com" ],
   //   "users" : [ "worf" ]
   // }
   doCreate: function (props) {
      const client = new ElasticSearchClient(region, props.Domain);

      return client.send('PUT', `${rolesURL}/${props.RoleName}`, props.RoleMapping)
         .then((resp) => {
            return {};
         });
   },

   doUpdate: function (physicalResourceId, props, oldProps) {
      const client = new ElasticSearchClient(region, props.Domain);

      return client.send('PUT', `${rolesURL}/${props.RoleName}`, props.RoleMapping)
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
