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

// DESKTOP LEFT PANEL ------------------------------------------------------

function closeLeftSidebar() {
    document.getElementById("left-sidebar").style.width = "0";
    document.getElementById("DemoMap").style.width = "100%";
    document.getElementById("open-left-sidebar-button").style.left = "-14px";
};

function openLeftSidebar() {
    document.getElementById("left-sidebar").style.width = "15%";
    document.getElementById("DemoMap").style.width ="85%";
    document.getElementById("open-left-sidebar-button").style.left = "-44px";
};

// MOBILE -----------------------------------------------------------------

function openMobileLegend() {
    document.getElementById("legendDiv").style.right =  "0px";
    document.getElementById("open-legend-button").style.right = "-30px";
}

function closeMobileLegend() {
    document.getElementById("legendDiv").style.right = "-350px";
    document.getElementById("open-legend-button").style.right = "0px";
}

function closeMobileInfo() {
    document.getElementById("mobile-information").style.left = "450px";
    document.getElementById("open-mobile-info-button").style.right = "0px";
    document.getElementById("DemoMap").style.opacity = "100%";
}

function openMobileInfo() {
    document.getElementById("mobile-information").style.left = "10%";
    document.getElementById("open-mobile-info-button").style.right = "-30px";
    document.getElementById("DemoMap").style.opacity = "40%";
}