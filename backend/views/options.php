<?php
/**
 * plugin settings
 *
 * @package   plugin
 * @author    Erik Golinelli <erik@codekraft.it>
 * @copyright 2022 Codekraft
 * @license   GPL 2.0+
 * @link      https://codekraft.it
 */

function get_plugin_settings() {
	return [
		[
			"key" => 0,
			"name" => "name",
			"title" => "User Name",
			"page" => "page",
			"section" => "section",
			"component" => "input",
			"data" => [
				"type" => "text",
				"value" => "your name",
				"disabled" => true
			],
			"validation" => [
				"required" => "This field is required",
				"pattern" => [
					"value" => "^[a-z ,.'-]+$",
					"message" => "the name needs to be at least "
				]
			]
		],
		[
			"key" => 1,
			"name" => "user_password",
			"title" => "User Password",
			"page" => "page",
			"section" => "section",
			"component" => "input",
			"data" => [
				"type" => "password",
				"placeholder" => __("Password placeholder", P_TEXTDOMAIN)
			],
			"validation" => [
				"required" => __("This field is required", P_TEXTDOMAIN),
				"pattern" => [
					"value" => "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
					"message" => __("Password needs to contain at least 8 letters (both upper and lowercase) and one number", P_TEXTDOMAIN)
				]
			]
		],
		[
			"key" => 12,
			"name" => "u_radio",
			"title" => "Radio Example",
			"page" => "page",
			"section" => "section",
			"component" => "radio",
			"data" => [
				"options" => [
					[
						"label" => "Author",
						"value" => "a"
					],
					[
						"label" => "Editor",
						"value" => "e"
					]
				],
				"help" => "we have also radio/tape deck"
			]
		],
		[
			"key" => 2,
			"name" => "u_type",
			"title" => "User type",
			"page" => "page",
			"section" => "section",
			"component" => "checkbox",
			"data" => [
				"label" => "Is author",
				"help" => "Is the user a author or not?"
			]
		],
		[
			"key" => 7,
			"name" => "toggle-checkbox",
			"title" => "Toggle something",
			"page" => "page",
			"section" => "section",
			"component" => "toggle",
			"data" => [
				"help" => "if it has something"
			]
		],
		[
			"key" => 14,
			"name" => "input-range",
			"title" => "Input something",
			"page" => "page",
			"section" => "section",
			"component" => "range",
			"data" => [
				"min" => 1,
				"max" => 10,
				"step" => "any",
				"allowreset" => true,
				"withinputfield" => false,
				"marks" => [
					[
						"value" => 0,
						"label" => "0"
					],
					[
						"value" => 1,
						"label" => "1"
					],
					[
						"value" => 8,
						"label" => "8"
					],
					[
						"value" => 10,
						"label" => "10"
					]
				]
			]
		],
		[
			"key" => 3,
			"name" => "u_color",
			"title" => "Choose the color",
			"page" => "page",
			"section" => "section",
			"component" => "color-picker",
			"data" => [
				"defaultValue" => "#f60"
			]
		],
		[
			"key" => 4,
			"name" => "select",
			"title" => "Select a User",
			"page" => "page",
			"section" => "section",
			"component" => "select",
			"data" => [
				"options" => [
					[
						"value" => "",
						"label" => "Select a User",
						"disabled" => true
					],
					[
						"value" => "a",
						"label" => "User A"
					],
					[
						"value" => "b",
						"label" => "User B"
					],
					[
						"value" => "c",
						"label" => "User c"
					]
				]
			]
		],
		[
			"key" => 11,
			"name" => "tree",
			"title" => "TreeSelect",
			"page" => "page",
			"section" => "section",
			"component" => "tree",
			"data" => [
				"noOptionLabel" => "No parent page",
				"tree" => [
					[
						"name" => "Page 1",
						"id" => "p1",
						"children" => [
							[
								"name" => "Descend 1 of page 1",
								"id" => "p11"
							],
							[
								"name" => "Descend 2 of page 1",
								"id" => "p12"
							]
						]
					],
					[
						"name" => "Page 2",
						"id" => "p2",
						"children" => [
							[
								"name" => "Descend 1 of page 2",
								"id" => "p21",
								"children" => [
									[
										"name" => "Descend 1 of Descend 1 of page 2",
										"id" => "p211"
									]
								]
							]
						]
					]
				]
			]
		],
		[
			"key" => 5,
			"name" => "date",
			"title" => "Select a date",
			"page" => "page",
			"section" => "section",
			"component" => "date"
		],
		[
			"key" => 6,
			"name" => "time",
			"title" => "Select Time",
			"page" => "page",
			"section" => "section",
			"component" => "time"
		],
		[
			"key" => 16,
			"name" => "datetime",
			"title" => "Select dateTime",
			"page" => "page",
			"section" => "section",
			"component" => "datetime"
		],
		[
			"key" => 8,
			"name" => "button",
			"title" => "Button something",
			"page" => "page",
			"section" => "section",
			"component" => "button",
			"data" => [
				"action" => "/wp-json/" . P_TEXTDOMAIN . '/v1/callback',
				"className" => "button-primary",
			]
		],
		[
			"key" => 10,
			"name" => "textarea-number",
			"title" => "Textarea",
			"page" => "page",
			"section" => "section",
			"component" => "textarea"
		]
	];
}
