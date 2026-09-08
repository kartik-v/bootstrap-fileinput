/**
 * Regression for https://github.com/kartik-v/bootstrap-fileinput/issues/1892
 *
 * jQuery 4 returns '' from .attr('multiple') for a present boolean attribute,
 * while .prop('multiple') is true. Multi-file checks must use .prop().
 *
 * Run (needs jsdom + jQuery 4):
 *   npm install --no-save jsdom jquery@4
 *   node --test test/jquery4-multiple-attr.test.js
 */
"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const { JSDOM } = require("jsdom");

const FILEINPUT = path.resolve(__dirname, "../js/fileinput.js");

function boot(html) {
  const dom = new JSDOM(html, {
    url: "http://localhost/",
    pretendToBeVisual: true,
    runScripts: "dangerously",
  });
  const w = dom.window;
  global.window = w;
  global.document = w.document;
  global.HTMLElement = w.HTMLElement;
  global.Node = w.Node;
  global.Element = w.Element;
  global.File = w.File;
  global.FileReader = w.FileReader;
  global.Blob = w.Blob;
  global.FormData = w.FormData;
  global.URL = w.URL;
  global.Image = w.Image;

  delete require.cache[require.resolve("jquery")];
  delete require.cache[require.resolve(FILEINPUT)];

  const $ = require("jquery");
  w.jQuery = $;
  global.$ = $;
  require(FILEINPUT);
  return $;
}

function initPlugin($el, options) {
  $el.fileinput(
    Object.assign(
      {
        showPreview: true,
        dropZoneEnabled: true,
        browseOnZoneClick: true,
        showUpload: false,
        uploadUrl: "/upload",
        maxFileCount: 10,
      },
      options || {}
    )
  );
  const plugin = $el.data("fileinput");
  assert.ok(plugin, "fileinput instance");
  plugin.readFiles = function () {};
  return plugin;
}

function addThenChange(plugin, existingId) {
  const first = new File(["a"], "a.txt", { type: "text/plain" });
  plugin.fileManager.add(first, existingId);
  assert.equal(plugin.fileManager.count(), 1);

  let cleared = false;
  const orig = plugin.clearFileStack.bind(plugin);
  plugin.clearFileStack = function () {
    cleared = true;
    return orig();
  };

  const second = new File(["b"], "b.txt", { type: "text/plain" });
  plugin._change(
    { isDefaultPrevented: function () { return false; }, target: plugin.$element[0] },
    [second]
  );
  return cleared;
}

describe("jQuery 4 multi-file detection (#1892)", () => {
  it("exposes jQuery 4 boolean-attr semantics: attr empty, prop true", () => {
    const $ = boot(
      '<!DOCTYPE html><html><body><input id="f" type="file" multiple></body></html>'
    );
    const $el = $("#f");
    assert.equal($.fn.jquery.split(".")[0], "4");
    assert.equal($el.attr("multiple"), "");
    assert.equal($el.prop("multiple"), true);
    assert.equal($el.attr("type"), "file");
  });

  it("uses plural caption and drop-zone copy for <input type=file multiple>", () => {
    const $ = boot(
      '<!DOCTYPE html><html><body><form><input id="f" type="file" multiple></form></body></html>'
    );
    const plugin = initPlugin($("#f"));
    assert.equal(plugin.$caption.attr("placeholder"), "Select files ...");
    const zone = plugin.$container.find(".file-drop-zone-title").html() || "";
    assert.match(zone, /select files/i);
    assert.doesNotMatch(zone, /select file(?!s)/i);
  });

  it("does not wipe prior files when adding more to a multiple input", () => {
    const $ = boot(
      '<!DOCTYPE html><html><body><form><input id="f" type="file" multiple></form></body></html>'
    );
    const plugin = initPlugin($("#f"));
    const cleared = addThenChange(plugin, "id-a");
    assert.equal(cleared, false, "clearFileStack must not run for a multi input");
    assert.equal(plugin.fileManager.count(), 1);
    assert.ok(plugin.fileManager.stack["id-a"]);
  });

  it("still treats a single-file input as single-file", () => {
    const $ = boot(
      '<!DOCTYPE html><html><body><form><input id="f" type="file"></form></body></html>'
    );
    const $el = $("#f");
    assert.equal($el.prop("multiple"), false);
    assert.equal($el.attr("multiple"), undefined);

    const plugin = initPlugin($el);
    assert.equal(plugin.$caption.attr("placeholder"), "Select file ...");

    const cleared = addThenChange(plugin, "id-a");
    assert.equal(cleared, true, "single-file input should still replace the prior file");
    assert.equal(plugin.fileManager.count(), 0);
  });
});
