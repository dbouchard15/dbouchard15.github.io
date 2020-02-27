function changeFilterLabels() {
    document.getElementsByTagName("option")[0].innerHTML = "All Facilities"
    document.getElementsByTagName("option")[1].innerHTML = "Counseling/Outpatient";
    document.getElementsByTagName("option")[2].innerHTML = "Crisis/Psychiatric Services";
    document.getElementsByTagName("option")[3].innerHTML = "Day Treatment";
    document.getElementsByTagName("option")[4].innerHTML = "Detoxification Services";
    document.getElementsByTagName("option")[5].innerHTML = "Long Term Treatment Services";
    document.getElementsByTagName("option")[6].innerHTML = "Medical";
    document.getElementsByTagName("option")[7].innerHTML = "National Self-Help Organizations";
    document.getElementsByTagName("option")[8].innerHTML = "Residential and Supportive Housing";
    document.getElementsByTagName("option")[9].innerHTML = "Short Term Inpatient Services";
    document.getElementsByTagName("option")[10].innerHTML ="Support Services, Helplines and Outreach";
};

function closeLeftSidebar() {
    document.getElementById("left-sidebar").style.width = "0";
    document.getElementById("DemoMap").style.width = "100%";
    document.getElementById("close-left-button").style.display = "none";
    document.getElementById("open-left-button-container").style.left = "0px";
};

function openLeftSidebar() {
    document.getElementById("left-sidebar").style.width = "15%";
    document.getElementById("DemoMap").style.width ="85%";
    document.getElementById("close-left-button").style.display = "inline-block";
    document.getElementById("open-left-button-container").style.left = "-50px";

};

function openMobileLegend() {
    document.getElementById("legendDiv").style.right =  "0px";
    document.getElementById("open-legend-button-container").style.right = "-50px";
}

function closeMobileLegend() {
    document.getElementById("legendDiv").style.right = "-350px";
    document.getElementById("open-legend-button-container").style.right = "0px";
}