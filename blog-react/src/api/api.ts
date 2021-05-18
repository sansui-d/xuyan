import * as Fetch from './fetch';


export const tagAdd = (data: any) => {
	return Fetch.post('/tag/add', data)
}
export const tagFind = (params :any) => {
    return Fetch.get('/tag/find',params)
}
export const tagUpd = (data :any) => {
    return Fetch.post('/tag/upd',data)
}
export const tagDelete = (params:any) =>{
	return Fetch.get('/tag/delete',params)
}
export const classifyAdd = (data: any) => {
	return Fetch.post('/classify/add', data)
}
export const classifyFind = (params :any) => {
    return Fetch.get('/classify/find',params)
}
export const classifyUpd = (data :any) => {
    return Fetch.post('/classify/upd',data)
}
export const classifyDelete = (params:any) =>{
	return Fetch.get('/classify/delete',params)
}
export const articleAdd = (data: any) => {
	return Fetch.post('/article/add', data)
}
export const articleFind = (params: any) => {
	return Fetch.get('/article/find', params)
}
export const articleFindId = (params: any) => {
	return Fetch.get('/article/findId', params)
}
export const articleFindTag = (data: any) => {
	return Fetch.post('/article/findTag', data)
}
export const articleFindClassify = (data: any) => {
	return Fetch.post('/article/findClassify', data)
}
export const articleFindPage = (data: any) => {
	return Fetch.post('/article/findPage', data)
}
export const articleDelete = (data: any) => {
	return Fetch.post('/article/delete', data)
}
export const articleUpd = (data: any) => {
	return Fetch.post('/article/upd', data)
}
export const articleUpdCon = (data: any) => {
	return Fetch.post('/article/updcon', data)
}
export const imgAdd = (data: any) => {
	return Fetch.post('/img/add', data)
}
export const imgFind = (params: any) => {
	return Fetch.get('/img/find', params)
}
export const imgDelete = (params: any) => {
	return Fetch.get('/img/delete', params)
}
export const imgLinkAdd = (data: any) => {
	return Fetch.post('/img/addLink', data)
}
export const imgLinkFind = (params: any) => {
	return Fetch.get('/img/findLink', params)
}
export const imgLinkDelete = (params: any) => {
	return Fetch.get('/img/deleteLink', params)
}
export const imgListAdd = (data: any) => {
	return Fetch.post('/img/addImgList', data)
}
export const imgListFind = (params: any) => {
	return Fetch.get('/img/findImgList', params)
}
export const imgListDelete = (params: any) => {
	return Fetch.get('/img/deleteImgList', params)
}
export const commentAdd = (data: any) => {
	return Fetch.post('/comment/add', data)
}
export const commentDelete = (params: any) => {
	return Fetch.get('/comment/delete', params)
}
export const commentFind = (data: any) => {
	return Fetch.post('/comment/find', data)
}
export const commentFindAll = (data: any) => {
	return Fetch.post('/comment/findAll', data)
}
export const recommentAdd = (data: any) => {
	return Fetch.post('/recomment/add', data)
}
export const recommentFindOne = (data: any) => {
	return Fetch.post('/recomment/findOne', data)
}
export const recommentDelete = (params: any) => {
	return Fetch.get('/recomment/delete', params)
}
export const linkAdd = (data: any) => {
	return Fetch.post('/link/add', data)
}
export const linkFind = (params: any) => {
	return Fetch.get('/link/find', params)
}
export const linkDelete = (params: any) => {
	return Fetch.get('/link/delete', params)
}
export const listAdd = (data: any) => {
	return Fetch.post('/imgList/add', data)
}
export const listFind = (params: any) => {
	return Fetch.get('/imgList/find', params)
}
export const listDelete = (params: any) => {
	return Fetch.get('/imgList/delete', params)
}
export const photolistFind = (params: any) => {
	return Fetch.get('/imgList/findPhotoList', params)
}

export const login = (data: any) => {
	return Fetch.post('/login/find', data)
}