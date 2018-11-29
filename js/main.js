const heightOfBlock = 80;
const width = 1024;
const height = 300;

$(document).ready(function() {
    registerBestfit();
    registerFirstfit();
    registerNextfit();
});

function registerFirstfit()
{
    var ff = new Firstfit(getRandomVariables());
    $('#firstfit').find('.btn-success')[0].onclick = function() {
        ff.addBlock();
    };
    $('#firstfit').find('.btn-danger')[0].onclick = function() {
        ff = new Firstfit(getRandomVariables());
    };
}

function registerNextfit()
{
    var nf = new Nextfit(getRandomVariables());
    $('#nextfit').find('.btn-success')[0].onclick = function() {
        nf.addBlock();
    };
    $('#nextfit').find('.btn-danger')[0].onclick = function() {
        nf = new Nextfit(getRandomVariables());
    };
}


function registerBestfit()
{
    var bf = new Bestfit(getRandomVariables());
    $('#bestfit').find('.btn-success')[0].onclick = function() {
        bf.addBlock();
    };
    $('#bestfit').find('.btn-danger')[0].onclick = function() {
        bf = new Bestfit(getRandomVariables());
    };
}


function addMessage(id, message)
{
    $("#"+id).find(".message")[0].innerHTML = message;
    $($("#"+id).find(".message")[0]).fadeTo("slow", 1, function() {});
    window.setTimeout(function() {
        jQuery(jQuery("#"+id).find(".message")[0]).fadeTo("slow", 0, function() {});
    }, 3000);
}


function getRandomVariables(n = 9)
{
    var data = [],
        min = 55,
        step = Math.floor(width/n),
        max = step;

    while(--n)
    {
        data.push(rand(min, max));
        min+=step;
        max+=step;
    }
    return data.sort(sortNumber);
}

function rand(min=0, max=9)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function sortNumber(a, b)
{
    return a - b;
}

function sortArr(a, b)
{
    return a[0] - b[0];
}
