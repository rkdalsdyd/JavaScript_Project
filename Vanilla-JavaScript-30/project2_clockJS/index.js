(function(){
    
    const hourContainer = document.getElementsByClassName('hand')[0],
    minContainer = document.getElementsByClassName('hand')[1],
    secondContainer = document.getElementsByClassName('hand')[2];

    function initialize(){
        const time = new Date();
        const hour = time.getHours();
        const min = time.getMinutes();
        const second = time.getSeconds();

        const curHour = (hour%12)*30 - 90;
        const curMin = min*6 - 90;
        const curSecond = second*6 - 90;

        hourContainer.style.transform = `rotate(${curHour}deg)`;
        minContainer.style.transform = `rotate(${curMin}deg)`;
        secondContainer.style.transform = `rotate(${curSecond}deg)`;
    }

    function main(){
        setInterval(initialize, 1000);
    }
    main();
})();