// const n=20;
var slider2=document.getElementById("size");
let n=document.getElementById("size").value;
console.log("size of array " + n);
const array=[];
for(let i=0;i<n;i++){
    array[i]=Math.random()
    showBars()
}
slider2.oninput = function() {
    container.innerHTML="";
    n=document.getElementById("size").value;
    console.log("n is " + n)
    array.length = 0;
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    console.log(array)
    showBars();
}

console.log(array)
let audioCtx=null;

function playNote(freq){
    if(audioCtx==null){
        // audioCtxt=new (AudioContext || webkitAudioContext || window.webkitAudioContext)();
        // create web audio api context
        audioCtx = new AudioContext();
        
    }

        const dur=0.1;
    const osc=audioCtx.createOscillator();
    // console.log(osc.frequency.value);
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination)

}


// init()
let toggle=0;
function init(){
   
    for (let i = 0; i < n; i++) {
        array[i]=Math.random();
    }
    showBars();
}

// const cols=[];
// const spacing=myCanvas.width/n;
// const ctx=myCanvas.getContext("2d");


function play1(){
   
    const copy=[...array];
    const moves=bubbleSort(copy);
    // showBars();
    animate(moves);
}

function play2(){
   
    const copy=[...array];
    const moves=insertionSort(copy)
    // showBars();
    animate(moves);
}

function play3(){
    
    const copy=[...array];
    const moves=mergeSort(copy)
    // showBars();
    animate(moves);
}

var slider = document.getElementById("speed");
let speed=document.getElementById("speed").value;
slider.oninput = function() {
    speed=document.getElementById("speed").value;
    console.log(1000/speed)
    showBars();
}
function animate(moves){
    if(moves.length==0){
        showBars()
        return;
    }
    const move=moves.shift();
    const [i,j]=move.indices;
    if(move.type=="swap"){
        [array[i],array[j]]=[array[j],array[i]];
    }
    playNote(200+array[i]*500);
    playNote(200+array[j]*500)
    showBars(move);

    
        setTimeout(function(){
            animate(moves);
        },1000/speed);
}


function bubbleSort(array){
    const moves=[];
    do{
        var swapped=false;
        for (let i = 1; i < array.length; i++){
            // moves.push({indices:[i-1,i],type:"comp"});
            if(array[i-1]>array[i]){
                swapped=true;
                moves.push({indices:[i-1,i],type:"swap"});
                [array[i-1],array[i]]=[array[i],array[i-1]]
            }
           
        }
    }while(swapped);
    return moves;
}


// insertion sort

function insertionSort(array){
    const moves=[];
    let i, key, j;  
    for (i = 1; i < array.length; i++) 
    {  
        key = array[i];  
        j = i - 1;  
   
        /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
        while (j >= 0 && array[j] > key) 
        {  
            moves.push({indices:[j+1,j],type:"swap"});
            array[j + 1] = array[j];  
            j = j - 1;  
        }  
        array[j + 1] = key;  
    }

    return moves;
}


// merge sort
function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
 
    // Merge the temp arrays back into arr[l..r]
 
    // Initial index of first subarray
    var i = 0;
 
    // Initial index of second subarray
    var j = 0;
 
    // Initial index of merged subarray
    var k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            moves.push({indices:[k,i],type:"swap"});
            arr[k] = L[i];
            i++;
        }
        else {
            moves.push({indices:[k,j],type:"swap"});
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        moves.push({indices:[k,i],type:"swap"});
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        moves.push({indices:[k,j],type:"swap"});
        arr[k] = R[j];
        j++;
        k++;
    }
}
 

function mergeSort(arr,l, r){
    const moves=[];
    if(l>=r){
        return;
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,l,m);
    moves.push({indices:[l,m],type:"area"});
    mergeSort(arr,m+1,r);
    moves.push({indices:[m+1,r],type:"area"});
    merge(arr,l,m,r);

    return moves;
}






function showBars(move) {
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        // const x=i*spacing+spacing/2;
        // const y=myCanvas.height;
        // const width=spacing;
        // const height=myCanvas.height*arr[i];
        // cols[i]=new Column(x,y,width,height);
        // cols[i].draw
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar")

        if(move && move.indices.includes(i)){
            // bar.style.backgroundColor=move.type=="swap"?"red":"blue";
            if(move.type=="swap"){
                bar.style.backgroundColor="red";
            }
            else if(move.type=="area"){
                bar.style.backgroundColor="purple"
            }
            else{
                bar.style.backgroundColor="blue";
            }
        }
        document.getElementById("container").appendChild(bar);
    
    }
    
}
