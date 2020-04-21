$(document).ready(function () {
$('.file-caption form-control  kv-fileinput-caption').addClass('input-group');
    $("#input-pd").fileinput({
        uploadUrl: "/file-upload-batch/1",
        uploadAsync: false,
        minFileCount: 2,
        maxFileCount: 5,
        overwriteInitial: false,
        initialPreview: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut mauris ut libero fermentum feugiat eu et dui. Mauris condimentum rhoncus enim, sed semper neque vestibulum id. Nulla semper, turpis ut consequat imperdiet, enim turpis aliquet orci, eget venenatis elit sapien non ante. Aliquam neque ipsum, rhoncus id ipsum et, volutpat tincidunt augue. Maecenas dolor libero, gravida nec est at, commodo tempor massa. Sed id feugiat massa. Pellentesque at est eu ante aliquam viverra ac sed est.",
            '<div class="text-center">' +
            '<h3>Lorem Ipsum</h3>' +
            '<p><em>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</em></p>' +
            '<h5><small>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</small></h5>' +
            '<hr>' +
            '</div>' +
            '<div class="text-justify">' +
            '<p>' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis convallis dolor sed dignissim. Phasellus euismod mauris vel dolor maximus, sed fermentum mauris lobortis. Aliquam luctus, diam in luctus egestas, magna lacus luctus libero, scelerisque mattis ante dolor ac nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse varius orci ultricies massa euismod, at semper turpis fermentum. Quisque vitae augue vel lectus viverra facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla lacinia molestie diam, et volutpat nunc bibendum a. Cras a est sed augue commodo accumsan quis vitae nisi.' +
            '</p>' +
            '<p>' +
            'Nunc sit amet metus et dui aliquet feugiat. Praesent lobortis, ipsum et elementum dignissim, urna libero fringilla justo, at tincidunt nisi mi sed mi. Integer vel est porttitor, tempor tortor non, lobortis felis. Curabitur porttitor nisi et volutpat iaculis. Fusce nec feugiat lectus, vitae ullamcorper lorem. Ut ultrices nunc imperdiet placerat malesuada. Proin commodo erat in egestas maximus.' +
            '</p>' +
            '</div>'
        ],
        initialPreviewAsData: true, // identify if you are sending preview data only and not the raw markup
        initialPreviewFileType: 'image', // image is the default and can be overridden in config below
        initialPreviewDownloadUrl: 'http://kartik-v.github.io/bootstrap-fileinput-samples/samples/{filename}', // includes the dynamic `filename` tag to be replaced for each config
        initialPreviewConfig: [
            {caption: "Desert.jpg", size: 827000, width: "120px", url: "/file-upload-batch/2", key: 1},
            {caption: "Lighthouse.jpg", size: 549000, width: "120px", url: "/file-upload-batch/2", key: 2},
            {
                type: "video",
                size: 375000,
                filetype: "video/mp4",
                caption: "KrajeeSample.mp4",
                url: "/file-upload-batch/2",
                key: 3,
                downloadUrl: 'http://kartik-v.github.io/bootstrap-fileinput-samples/samples/small.mp4', // override url
                filename: 'KrajeeSample.mp4' // override download filename
            },
            {type: "office", size: 102400, caption: "SampleDOCFile_100kb.doc", url: "/file-upload-batch/2", key: 4},
            {type: "xlsx", size: 102400, caption: "SampleDOCFile_100kb.doc", url: "/file-upload-batch/2", key: 4},
            {type: "office", size: 45056, caption: "SampleXLSFile_38kb.xls", url: "/file-upload-batch/2", key: 5},
            {type: "office", size: 512000, caption: "SamplePPTFile_500kb.ppt", url: "/file-upload-batch/2", key: 6},
            {type: "gdocs", size: 811008, caption: "multipage_tiff_example.tif", url: "/file-upload-batch/2", key: 7},
            {type: "gdocs", size: 375808, caption: "sample_ai.ai", url: "/file-upload-batch/2", key: 8},
            {type: "gdocs", size: 40960, caption: "sample_eps.eps", url: "/file-upload-batch/2", key: 9},
            {type: "pdf", size: 8000, caption: "About.pdf", url: "/file-upload-batch/2", key: 10, downloadUrl: false}, // disable download
            {type: "text", size: 1430, caption: "LoremIpsum.txt", url: "/file-upload-batch/2", key: 11, downloadUrl: false},  // disable download
            {type: "html", size: 3550, caption: "LoremIpsum.html", url: "/file-upload-batch/2", key: 12, downloadUrl: false}  // disable download
        ],
        purifyHtml: true, // this by default purifies HTML data for preview
        uploadExtraData: {
            img_key: "1000",
            img_keywords: "happy, places"
        }
    }).on('filesorted', function(e, params) {
        console.log('File sorted params', params);
    }).on('fileuploaded', function(e, params) {
        console.log('File uploaded params', params);
    });





});