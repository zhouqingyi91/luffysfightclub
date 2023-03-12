import React from 'react';

const DashboardApi = "dashboardApi";
const loginPath = "/api/login";
const logoutPath = "/api/logout";
const refreshPath = "/api/refresh";

const s3PathPrefix = "/api/s3";

const albumsPath = s3PathPrefix + "/albums";
const albumPhotosPath = s3PathPrefix + "/album/photos";
const deleteObjectPath = s3PathPrefix + "/object";
const getIdentityPoolIdPath = s3PathPrefix + "/credential/identitypoolid";
const addAlbumPath = s3PathPrefix + "/album";
const delAlbumPath = s3PathPrefix + "/album";

export default DashboardApi;
export {
  albumsPath,
  loginPath,
  logoutPath,
  refreshPath,
  albumPhotosPath,
  deleteObjectPath,
  getIdentityPoolIdPath,
  addAlbumPath,
  delAlbumPath
}