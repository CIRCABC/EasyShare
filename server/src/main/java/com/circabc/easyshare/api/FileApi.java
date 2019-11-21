/**
 * EasyShare - a module of CIRCABC
 * Copyright (C) 2019 European Commission
 *
 * This file is part of the "EasyShare" project.
 *
 * This code is publicly distributed under the terms of EUPL-V1.2 license,
 * available at root of the project or at https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12.
 */
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (4.2.1-SNAPSHOT).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package com.circabc.easyshare.api;

import com.circabc.easyshare.model.FileInfoUploader;
import com.circabc.easyshare.model.FileRequest;
import com.circabc.easyshare.model.Recipient;
import com.circabc.easyshare.model.RecipientWithLink;
import org.springframework.core.io.Resource;
import com.circabc.easyshare.model.Status;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2019-11-05T16:07:50.538+01:00[Europe/Paris]")

@Validated
@Api(value = "file", description = "the file API")
public interface FileApi {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    @ApiOperation(value = "", nickname = "deleteFile", notes = "Used by INTERNAL users and ADMIN in order to delete a file", authorizations = {
        @Authorization(value = "openId")
    }, tags={ "File", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "SUCCESS Deletes the file content and its meta data, also sends an email to original uploader with the reason of deletion if the reason is given"),
        @ApiResponse(code = 401, message = "UNAUTHORIZED the Error message will be empty", response = Status.class),
        @ApiResponse(code = 403, message = "FORBIDDEN the Error message will be NotAuthorized", response = Status.class),
        @ApiResponse(code = 404, message = "NOT FOUND the Error Message will be empty", response = Status.class),
        @ApiResponse(code = 500, message = "INTERNAL SERVER ERROR the Error Message will be empty", response = Status.class) })
    @RequestMapping(value = "/file/{fileID}",
        produces = { "application/json" }, 
        method = RequestMethod.DELETE)
    default ResponseEntity<Void> deleteFile(@ApiParam(value = "The id of the file",required=true) @PathVariable("fileID") String fileID,@ApiParam(value = "Reason for deletion of the file") @Valid @RequestParam(value = "reason", required = false) String reason) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    @ApiOperation(value = "", nickname = "deleteFileSharedWithUser", notes = "Used by INTERNAL users in order to delete a share link for one of the shared users", authorizations = {
        @Authorization(value = "openId")
    }, tags={ "File", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "SUCCESS"),
        @ApiResponse(code = 401, message = "UNAUTHORIZED the Error message will be empty", response = Status.class),
        @ApiResponse(code = 403, message = "FORBIDDEN the Error message will be NotAuthorized", response = Status.class),
        @ApiResponse(code = 404, message = "NOT FOUND the Error Message will be either FileNotFound or UserNotFound", response = Status.class),
        @ApiResponse(code = 500, message = "INTERNAL SERVER ERROR the Error Message will be empty", response = Status.class) })
    @RequestMapping(value = "/file/{fileID}/fileRequest/sharedWith/{userID}",
        produces = { "application/json" }, 
        method = RequestMethod.DELETE)
    default ResponseEntity<Void> deleteFileSharedWithUser(@ApiParam(value = "The id of the file",required=true) @PathVariable("fileID") String fileID,@ApiParam(value = "The id of the user",required=true) @PathVariable("userID") String userID) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    @ApiOperation(value = "", nickname = "getFile", notes = "Used by INTERNAL and EXTERNAL users to download a shared file", response = Resource.class, tags={ "File", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "SUCCESS Returns the file and sends a mail to original uploader to inform him of the download", response = Resource.class),
        @ApiResponse(code = 401, message = "UNAUTHORIZED the Error message will be empty", response = Status.class),
        @ApiResponse(code = 404, message = "NOT FOUND the Error Message will be empty", response = Status.class),
        @ApiResponse(code = 500, message = "INTERNAL SERVER ERROR the Error Message will be empty", response = Status.class) })
    @RequestMapping(value = "/file/{fileID}",
        produces = { "application/octet-stream", "application/json" }, 
        method = RequestMethod.GET)
    default ResponseEntity<Resource> getFile(@ApiParam(value = "The id of the file",required=true) @PathVariable("fileID") String fileID,@ApiParam(value = "Password of the file") @Valid @RequestParam(value = "password", required = false) String password) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    @ApiOperation(value = "", nickname = "postFileContent", notes = "Used by INTERNAL users in order to post the file content on the pre-reserved file space", response = FileInfoUploader.class, authorizations = {
        @Authorization(value = "openId")
    }, tags={ "File", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "SUCCESS Returns the FileInfoUploader of the uploaded file", response = FileInfoUploader.class),
        @ApiResponse(code = 400, message = "BAD REQUEST the Error Message will be empty", response = Status.class),
        @ApiResponse(code = 401, message = "UNAUTHORIZED the Error message will be empty", response = Status.class),
        @ApiResponse(code = 403, message = "FORBIDDEN the Error message will be NotAuthorized, FileLargerThanAllocation, IllegalFileSize", response = Status.class),
        @ApiResponse(code = 404, message = "NOT FOUND the Error Message will be empty", response = Status.class),
        @ApiResponse(code = 500, message = "INTERNAL SERVER ERROR the Error Message will be empty", response = Status.class) })
    @RequestMapping(value = "/file/{fileID}/fileRequest/fileContent",
        produces = { "application/json" }, 
        consumes = { "application/octet-stream" },
        method = RequestMethod.POST)
    default ResponseEntity<FileInfoUploader> postFileContent(@ApiParam(value = "The id of the file",required=true) @PathVariable("fileID") String fileID,@ApiParam(value = "The file bytes"  )  @Valid @RequestBody Resource body) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    ApiUtil.setExampleResponse(request, "application/json", "null");
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    @ApiOperation(value = "", nickname = "postFileFileRequest", notes = "Used by INTERNAL users in order to request the reservation of space for a file", response = String.class, authorizations = {
        @Authorization(value = "openId")
    }, tags={ "File", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "SUCCESS Returns the File ID of the newly-created file", response = String.class),
        @ApiResponse(code = 400, message = "BAD REQUEST the Error Message will be empty", response = Status.class),
        @ApiResponse(code = 401, message = "UNAUTHORIZED the Error message will be empty", response = Status.class),
        @ApiResponse(code = 403, message = "FORBIDDEN the Error message will be NotAuthorized, IllegalFileSize, DateLiesInPast, UserHasInsufficientSpace, EmptyFileName, WrongEmailStructure", response = Status.class),
        @ApiResponse(code = 500, message = "INTERNAL SERVER ERROR the Error Message will be empty", response = Status.class) })
    @RequestMapping(value = "/file/fileRequest",
        produces = { "text/plain", "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    default ResponseEntity<String> postFileFileRequest(@ApiParam(value = "" ,required=true )  @Valid @RequestBody FileRequest fileRequest) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    @ApiOperation(value = "", nickname = "postFileSharedWith", notes = "Used by INTERNAL users in order to add a person to the list of shared, after having uploaded the file a first time. Will send an email if required", response = RecipientWithLink.class, authorizations = {
        @Authorization(value = "openId")
    }, tags={ "File", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "SUCCESS Returns the RecipientWithLink for the added recipient", response = RecipientWithLink.class),
        @ApiResponse(code = 400, message = "BAD REQUEST the Error Message will be empty", response = Status.class),
        @ApiResponse(code = 401, message = "UNAUTHORIZED the Error message will be empty", response = Status.class),
        @ApiResponse(code = 403, message = "FORBIDDEN the Error message will be NotAuthorized", response = Status.class),
        @ApiResponse(code = 404, message = "NOT FOUND the Error Message will be empty", response = Status.class),
        @ApiResponse(code = 500, message = "INTERNAL SERVER ERROR the Error Message will be empty", response = Status.class) })
    @RequestMapping(value = "/file/{fileID}/fileRequest/sharedWith",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    default ResponseEntity<RecipientWithLink> postFileSharedWith(@ApiParam(value = "The id of the file",required=true) @PathVariable("fileID") String fileID,@ApiParam(value = "The userID or email of user to share the file with" ,required=true )  @Valid @RequestBody Recipient recipient) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    ApiUtil.setExampleResponse(request, "application/json", "null");
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

}
