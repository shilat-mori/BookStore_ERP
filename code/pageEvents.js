import loading_data from './bookStore.js'
function load_page(){
   loading_data()
}

function paging(count){
   let page_numbers
   pagination+=(count+pagination<1)?1:(count+pagination>maxPage)?maxPage:count+pagination
   page_numbers = document.getElementsByClassName('page-num')
   switch(count){
       case 0:{
           break
       }
       case 1:{
           paging_range.push(paging_range[length-1]+1)
           paging_range.shift()
       }
       case -1:{
           paging_range.pop()
           paging_range.unshift(paging_range[0]-1)
       }
   }
   for(let i in paging_range){
       page_numbers[i].innerText = paging_range[i]
       page_numbers[i].style.border = '1px solid wight'
   }
}