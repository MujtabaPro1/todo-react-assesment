export default  class IndexService {

   async getKey(key: string){
       return localStorage.getItem(key);
   }

   async setKey(key: string,value : any){
       await localStorage.setItem(key,value);
   }

   async removeKey(key: string){
       await localStorage.removeItem(key);
   }

   async removeAll(){
       await localStorage.clear();
   }
}
